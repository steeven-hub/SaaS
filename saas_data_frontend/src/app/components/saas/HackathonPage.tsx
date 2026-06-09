import { useState } from 'react';
import { Container, Box, Typography, Paper, Grid, Button, Checkbox, FormControlLabel, Chip } from '@mui/material';
import { Trophy, Upload, CheckCircle, XCircle, BarChart2, Table, Wand2 } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import ValidationHistory from '../ValidationHistory';

import { API_BASE_URL } from '../../config';

const correlationData = [
  { x: 0.1, y: 0.2, z: 200, name: 'Var A vs B' },
  { x: 0.3, y: 0.8, z: 260, name: 'Var C vs D' },
  { x: 0.5, y: 0.6, z: 400, name: 'Var E vs F' },
  { x: 0.7, y: 0.9, z: 280, name: 'Var G vs H' },
  { x: 0.9, y: 0.3, z: 500, name: 'Var I vs J' },
];

const featureEngineeringTasks = [
  { id: 1, task: 'Handle missing values (imputation/removal)', completed: true },
  { id: 2, task: 'Encode categorical variables (one-hot/label encoding)', completed: true },
  { id: 3, task: 'Scale/normalize numerical features', completed: true },
  { id: 4, task: 'Create interaction features', completed: false },
  { id: 5, task: 'Polynomial feature generation', completed: false },
  { id: 6, task: 'Feature selection (remove low variance)', completed: false },
  { id: 7, task: 'Handle outliers (IQR/Z-score)', completed: false },
  { id: 8, task: 'Create time-based features', completed: false },
];

export function HackathonPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'none' | 'valid' | 'invalid'>('none');
  const [uploadedSubmission, setUploadedSubmission] = useState<string | null>(null);
  const [checklist, setChecklist] = useState(featureEngineeringTasks);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [edaMetrics, setEdaMetrics] = useState([
    { label: 'Total Rows', value: '0' },
    { label: 'Total Columns', value: '0' },
    { label: 'Missing Values', value: '0' },
    { label: 'Status', value: 'Waiting' },
  ]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('tasks', JSON.stringify(checklist));

    try {
      const response = await fetch(`${API_BASE_URL}/hackathon/validate-submission`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const report = data.report.validation_report;
        
        setEdaMetrics([
            { label: 'Total Rows', value: report.row_count.toString() },
            { label: 'Total Columns', value: report.columns.length.toString() },
            { label: 'Missing Values', value: `${report.missing_values}` },
            { label: 'Status', value: report.warnings.length === 0 ? 'Passed' : 'Warnings' },
        ]);
        
        setSubmissionStatus(report.warnings.length === 0 ? 'valid' : 'invalid');
        setUploadedSubmission(selectedFile.name);
      } else {
        const errorText = await response.text();
        console.error("Validation failed with status:", response.status, errorText);
        alert(`Erreur lors de la validation (${response.status})`);
        setSubmissionStatus('invalid');
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSubmissionStatus('invalid');
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setUploadedSubmission(files[0].name);
      
      setTimeout(async () => {
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('tasks', JSON.stringify(checklist));

        try {
            setLoading(true);
            const url = `${API_BASE_URL}/hackathon/validate-submission`;
            console.log("Fetching:", url);
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
                body: formData,
            });

            const text = await response.text();
            console.log("Response Status:", response.status);
            console.log("Response Content (first 100 chars):", text.substring(0, 100));

            if (response.ok) {
                const data = JSON.parse(text);
                const report = data.report.validation_report;
                
                setEdaMetrics([
                    { label: 'Total Rows', value: report.row_count.toString() },
                    { label: 'Total Columns', value: report.columns.length.toString() },
                    { label: 'Missing Values', value: `${report.missing_values}` },
                    { label: 'Status', value: report.warnings.length === 0 ? 'Passed' : 'Warnings' },
                ]);
                
                setSubmissionStatus(report.warnings.length === 0 ? 'valid' : 'invalid');
            } else {
                console.error("Auto-processing failed with status:", response.status, text);
                setSubmissionStatus('invalid');
            }
        } catch (err) {
            console.error("Auto-processing network/script error:", err);
            setSubmissionStatus('invalid');
        } finally {
            setLoading(false);
        }
      }, 100);
    }
  };

  const handleChecklistToggle = async (id: number) => {
    // 1. Update UI immediately
    const updatedChecklist = checklist.map((item) => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setChecklist(updatedChecklist);

    // 2. If a file is uploaded, trigger backend processing with the new state
    if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('tasks', JSON.stringify(updatedChecklist));

        try {
            const response = await fetch(`${API_BASE_URL}/hackathon/validate-submission`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Task applied:", data.report.tasks_completed);
            }
        } catch (err) {
            console.error("Auto-processing failed", err);
        }
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Trophy size={40} color="#2dd4bf" />
          <Typography variant="h3" sx={{ color: 'white', fontWeight: 800 }}>
            Kaggle & Zindi Hackathon Studio
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: '#94a3b8' }}>
          Automated EDA, feature engineering workspace, and submission validation for data science competitions
        </Typography>
      </Box>

      {/* Auto-EDA Dashboard */}
      <Paper
        sx={{
          p: 4,
          mb: 4,
          background: 'rgba(30, 41, 59, 0.8)',
          border: '1px solid rgba(45, 212, 191, 0.2)',
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <BarChart2 size={28} color="#2dd4bf" />
          <Typography variant="h5" sx={{ color: 'white', fontWeight: 700 }}>
            Auto-EDA Dashboard
          </Typography>
          <Chip
            label="Auto-Generated"
            size="small"
            sx={{
              background: 'rgba(45, 212, 191, 0.15)',
              color: '#2dd4bf',
              border: '1px solid rgba(45, 212, 191, 0.3)',
              fontWeight: 600,
            }}
          />
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {edaMetrics.map((metric, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  background: '#0f172a',
                  border: '1px solid rgba(45, 212, 191, 0.3)',
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1 }}>
                  {metric.label}
                </Typography>
                <Typography variant="h4" sx={{ color: '#2dd4bf', fontWeight: 800 }}>
                  {metric.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Correlation Matrix Scatter */}
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
          Feature Correlation Matrix
        </Typography>
        <Paper
          sx={{
            p: 3,
            background: '#0f172a',
            border: '1px solid rgba(45, 212, 191, 0.3)',
            borderRadius: 2,
          }}
        >
          <ResponsiveContainer width="100%" height={350}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
              <XAxis
                type="number"
                dataKey="x"
                name="Feature X"
                domain={[0, 1]}
                stroke="#94a3b8"
                label={{ value: 'Feature Correlation (X)', position: 'insideBottom', offset: -10, fill: '#94a3b8' }}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Feature Y"
                domain={[0, 1]}
                stroke="#94a3b8"
                label={{ value: 'Feature Correlation (Y)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
              />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{
                  background: '#1e293b',
                  border: '1px solid rgba(45, 212, 191, 0.3)',
                  borderRadius: 8,
                  color: 'white',
                }}
              />
              <Scatter name="Feature Correlations" data={correlationData} fill="#2dd4bf">
                {correlationData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.y > 0.7 ? '#ef4444' : entry.y > 0.5 ? '#f97316' : '#2dd4bf'}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </Paper>
      </Paper>

      <Grid container spacing={4}>
        {/* Feature Engineering Checklist */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 4,
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(45, 212, 191, 0.2)',
              borderRadius: 2,
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Wand2 size={28} color="#2dd4bf" />
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 700 }}>
                Feature Engineering Checklist
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                  Progress
                </Typography>
                <Typography variant="body2" sx={{ color: '#2dd4bf', fontWeight: 600 }}>
                  {checklist.filter((t) => t.completed).length} / {checklist.length} completed
                </Typography>
              </Box>
              <Box
                sx={{
                  height: 8,
                  background: 'rgba(148, 163, 184, 0.2)',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    width: `${(checklist.filter((t) => t.completed).length / checklist.length) * 100}%`,
                    background: 'linear-gradient(90deg, #2dd4bf 0%, #14b8a6 100%)',
                    transition: 'width 0.3s ease',
                  }}
                />
              </Box>
            </Box>

            {checklist.map((item) => (
              <Paper
                key={item.id}
                sx={{
                  p: 2,
                  mb: 2,
                  background: item.completed ? 'rgba(45, 212, 191, 0.1)' : '#0f172a',
                  border: `1px solid ${item.completed ? 'rgba(45, 212, 191, 0.3)' : 'rgba(148, 163, 184, 0.2)'}`,
                  borderRadius: 2,
                  cursor: 'pointer',
                  '&:hover': {
                    border: `1px solid ${item.completed ? 'rgba(45, 212, 191, 0.5)' : 'rgba(148, 163, 184, 0.4)'}`,
                  },
                }}
                onClick={() => handleChecklistToggle(item.id)}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={item.completed}
                      sx={{
                        color: '#94a3b8',
                        '&.Mui-checked': { color: '#2dd4bf' },
                      }}
                    />
                  }
                  label={
                    <Typography
                      variant="body1"
                      sx={{
                        color: item.completed ? '#2dd4bf' : 'white',
                        textDecoration: item.completed ? 'line-through' : 'none',
                      }}
                    >
                      {item.task}
                    </Typography>
                  }
                />
              </Paper>
            ))}
          </Paper>
        </Grid>

        {/* Submission Validator */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 4,
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(45, 212, 191, 0.2)',
              borderRadius: 2,
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Table size={28} color="#2dd4bf" />
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 700 }}>
                Submission Validator
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3 }}>
              Upload your submission file to validate format, column names, and data types before submitting to the
              competition.
            </Typography>

            <Box
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              sx={{
                border: `2px dashed ${
                  submissionStatus === 'valid'
                    ? '#2dd4bf'
                    : submissionStatus === 'invalid'
                    ? '#ef4444'
                    : isDragging
                    ? '#2dd4bf'
                    : 'rgba(148, 163, 184, 0.3)'
                }`,
                borderRadius: 2,
                p: 6,
                textAlign: 'center',
                background:
                  submissionStatus === 'valid'
                    ? 'rgba(45, 212, 191, 0.05)'
                    : submissionStatus === 'invalid'
                    ? 'rgba(239, 68, 68, 0.05)'
                    : isDragging
                    ? 'rgba(45, 212, 191, 0.05)'
                    : 'rgba(15, 23, 42, 0.5)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                mb: 3,
              }}
            >
              {submissionStatus === 'none' ? (
                <>
                  <Upload
                    size={64}
                    color={isDragging ? '#2dd4bf' : '#64748b'}
                    style={{ marginBottom: 16 }}
                  />
                  <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                    Drag & drop submission file
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                    CSV format only • Max 100MB
                  </Typography>
                </>
              ) : submissionStatus === 'valid' ? (
                <>
                  <CheckCircle size={64} color="#2dd4bf" style={{ marginBottom: 16 }} />
                  <Typography variant="h6" sx={{ color: '#2dd4bf', mb: 1 }}>
                    Validation Successful!
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#cbd5e1', mb: 2 }}>
                    {uploadedSubmission}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      background: 'linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                      },
                    }}
                    onClick={handleSubmit}
                  >
                    Submit to Competition
                  </Button>
                </>
              ) : (
                <>
                  <XCircle size={64} color="#ef4444" style={{ marginBottom: 16 }} />
                  <Typography variant="h6" sx={{ color: '#ef4444', mb: 1 }}>
                    Validation Failed
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#cbd5e1', mb: 2 }}>
                    {uploadedSubmission}
                  </Typography>
                </>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 4 }}>
        <ValidationHistory />
      </Box>
    </Container>
  );
}
