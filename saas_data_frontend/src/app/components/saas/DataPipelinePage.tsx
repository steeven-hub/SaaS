import { useState } from 'react';
import { runMarketPipeline } from '../../services/pipelineService';

const styles = {
  container: { padding: '40px', maxWidth: '800px', margin: '0 auto', color: '#fff', fontFamily: 'sans-serif' },
  paper: { padding: '20px', background: 'rgba(30, 41, 59, 0.8)', borderRadius: '8px', border: '1px solid #2dd4bf', marginBottom: '20px' },
  button: { padding: '10px 20px', background: '#2dd4bf', border: 'none', borderRadius: '4px', cursor: 'pointer', color: '#0f172a', fontWeight: 'bold' },
  section: { marginTop: '20px', padding: '20px', background: '#0f172a', borderRadius: '8px', overflowX: 'auto' as const }
};

export function DataPipelinePage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleRun = async () => {
    setLoading(true);
    setError(null);
    setResult(null); 
    try {
      const data = await runMarketPipeline(file);
      setResult(data);
    } catch (e) {
      setError('Erreur lors du pipeline.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={{ marginBottom: '20px' }}>Pipeline de Données Marchés</h1>
      
      <div style={styles.paper}>
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} 
          style={{ marginBottom: '10px', display: 'block' }}
        />
        <button onClick={handleRun} disabled={loading} style={styles.button}>
          {loading ? 'Exécution...' : 'Exécuter le Pipeline (ou Upload CSV)'}
        </button>
      </div>

      {error && <div style={{ color: '#ef4444', marginTop: '10px' }}>{error}</div>}

      {result && (
        <>
          <div style={styles.section}>
            <h3>Indicateurs de Qualité</h3>
            <pre>{JSON.stringify(result.metrics, null, 2)}</pre>
          </div>
          <div style={styles.section}>
            <h3>Analyse IA</h3>
            <div style={{ whiteSpace: 'pre-wrap' }}>{result.ai_analysis}</div>
          </div>
          <div style={styles.section}>
            <p>Rapport généré : {result.report_url}</p>
          </div>
        </>
      )}
    </div>
  );
}
