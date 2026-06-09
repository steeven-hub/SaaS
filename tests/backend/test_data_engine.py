import pytest
import io
import pandas as pd
import os
import django
from django.conf import settings
from unittest.mock import patch

# Setup Django for tests
if not settings.configured:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
    django.setup()

from api.data_engine import DataEngine

def test_process_data_csv():
    # Create a dummy CSV
    data = "name,age,city\nJohn,30,New York\nJane,25,Los Angeles\nJohn,30,New York\nBob,,Chicago"
    file_content = data.encode('utf-8')
    filename = "test.csv"
    
    # Mock LLM insights to avoid external calls and cache issues
    with patch('api.data_engine.DataEngine.get_llm_insights', return_value="Mocked AI insights"):
        output, insights, corr_data = DataEngine.process_data(file_content, filename)
    
    # Read the output Excel back into a DataFrame
    excel_file = pd.ExcelFile(output)
    assert 'Data' in excel_file.sheet_names
    assert 'AI_Insights' in excel_file.sheet_names
    
    df_output = pd.read_excel(output, sheet_name='Data')
    
    # Verify duplicates are NOT removed by default in data_engine.py (current logic)
    assert len(df_output) == 4
    
    # Verify column presence
    assert 'name' in df_output.columns
    assert 'age' in df_output.columns

def test_process_data_excel():
    # Create a dummy Excel
    df = pd.DataFrame({
        "name": ["John", "Jane", "John", "Bob"],
        "age": [30.0, 25.0, 30.0, None],
        "city": ["New York", "Los Angeles", "New York", "Chicago"]
    })
    excel_buffer = io.BytesIO()
    df.to_excel(excel_buffer, index=False)
    file_content = excel_buffer.getvalue()
    filename = "test.xlsx"
    
    with patch('api.data_engine.DataEngine.get_llm_insights', return_value="Mocked AI insights"):
        output, insights, corr_data = DataEngine.process_data(file_content, filename)
    
    df_output = pd.read_excel(output)
    assert len(df_output) == 4

def test_process_data_json():
    # Create a dummy JSON
    import json
    data = [
        {"name": "John", "age": 30, "city": "New York"},
        {"name": "Jane", "age": 25, "city": "Los Angeles"},
        {"name": "John", "age": 30, "city": "New York"},
        {"name": "Bob", "age": None, "city": "Chicago"}
    ]
    file_content = json.dumps(data).encode('utf-8')
    filename = "test.json"
    
    with patch('api.data_engine.DataEngine.get_llm_insights', return_value="Mocked AI insights"):
        output, insights, corr_data = DataEngine.process_data(file_content, filename)
    
    df_output = pd.read_excel(output)
    assert len(df_output) == 4

def test_process_data_invalid_format():
    file_content = b"some content"
    filename = "test.txt"
    
    with pytest.raises(ValueError, match="Unsupported or corrupted file format"):
        DataEngine.process_data(file_content, filename)
