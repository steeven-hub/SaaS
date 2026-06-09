import pytest
import io
import pandas as pd
from app.services.data_engine import DataEngine

def test_process_data_csv():
    # Create a dummy CSV
    data = "name,age,city\nJohn,30,New York\nJane,25,Los Angeles\nJohn,30,New York\nBob,,Chicago"
    file_content = data.encode('utf-8')
    filename = "test.csv"
    
    output, insights = DataEngine.process_data(file_content, filename)
    
    # Read the output Excel back into a DataFrame
    excel_file = pd.ExcelFile(output)
    assert 'Cleaned Data' in excel_file.sheet_names
    assert 'Decision Hub' in excel_file.sheet_names
    assert 'Profiling Report' in excel_file.sheet_names
    assert 'Chart Data' in excel_file.sheet_names
    
    df_output = pd.read_excel(output, sheet_name='Cleaned Data')
    
    # Verify duplicates are removed (John, 30, New York appeared twice)
    assert len(df_output) == 3
    
    # Verify NaNs are handled (Bob's age should be 0)
    bob_age = df_output[df_output['name'] == 'Bob']['age'].values[0]
    assert bob_age == 0

def test_process_data_excel():
    # Create a dummy Excel
    df = pd.DataFrame({
        "name": ["John", "Jane", "John", "Bob"],
        "age": [30, 25, 30, None],
        "city": ["New York", "Los Angeles", "New York", "Chicago"]
    })
    excel_buffer = io.BytesIO()
    df.to_excel(excel_buffer, index=False)
    file_content = excel_buffer.getvalue()
    filename = "test.xlsx"
    
    output, insights = DataEngine.process_data(file_content, filename)
    
    df_output = pd.read_excel(output)
    
    assert len(df_output) == 3
    bob_age = df_output[df_output['name'] == 'Bob']['age'].values[0]
    assert bob_age == 0

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
    
    output, insights = DataEngine.process_data(file_content, filename)
    
    df_output = pd.read_excel(output)
    
    assert len(df_output) == 3
    bob_age = df_output[df_output['name'] == 'Bob']['age'].values[0]
    assert bob_age == 0

def test_process_data_invalid_format():
    file_content = b"some content"
    filename = "test.txt"
    
    with pytest.raises(ValueError, match="Unsupported file format"):
        DataEngine.process_data(file_content, filename)
