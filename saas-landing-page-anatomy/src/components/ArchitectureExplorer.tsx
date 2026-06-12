import { useState } from 'react';
import { Folder, FolderOpen, FileCode, FileText, ChevronRight, ChevronDown, Box } from 'lucide-react';

interface FileNode {
  name: string;
  type: 'folder' | 'file';
  children?: FileNode[];
  language?: string;
  code?: string;
}

const FILE_TREE: FileNode[] = [
  {
    name: 'frontend-angular',
    type: 'folder',
    children: [
      {
        name: 'src',
        type: 'folder',
        children: [
          {
            name: 'app.component.ts',
            type: 'file',
            language: 'typescript',
            code: `<span class="token-keyword">import</span> { <span class="token-type">Component</span>, <span class="token-type">OnInit</span> } <span class="token-keyword">from</span> <span class="token-string">'@angular/core'</span>;
<span class="token-keyword">import</span> { <span class="token-type">AuthService</span> } <span class="token-keyword">from</span> <span class="token-string">'./services/auth.service'</span>;
<span class="token-keyword">import</span> { <span class="token-type">AnalyticsModule</span> } <span class="token-keyword">from</span> <span class="token-string">'./modules/analytics'</span>;

<span class="token-comment">// 🚀 Composant principal de l'application SaaS</span>
<span class="token-comment">// L'authentification Stripe est pré-configurée</span>
<span class="token-decorator">@Component</span>({
  <span class="token-variable">selector</span>: <span class="token-string">'app-root'</span>,
  <span class="token-variable">templateUrl</span>: <span class="token-string">'./app.component.html'</span>,
  <span class="token-variable">standalone</span>: <span class="token-keyword">true</span>,
  <span class="token-variable">imports</span>: [<span class="token-type">AnalyticsModule</span>]
})
<span class="token-keyword">export class</span> <span class="token-type">AppComponent</span> <span class="token-keyword">implements</span> <span class="token-type">OnInit</span> {
  <span class="token-variable">title</span> = <span class="token-string">'SaaS-Data Engine SaaS Platform'</span>;
  <span class="token-variable">isAuthenticated</span> = <span class="token-keyword">false</span>;

  <span class="token-keyword">constructor</span>(<span class="token-keyword">private</span> <span class="token-variable">auth</span>: <span class="token-type">AuthService</span>) {}

  <span class="token-function">ngOnInit</span>() {
    <span class="token-comment">// Vérification automatique du token JWT</span>
    <span class="token-keyword">this</span>.<span class="token-variable">isAuthenticated</span> = <span class="token-keyword">this</span>.<span class="token-variable">auth</span>.<span class="token-function">checkToken</span>();
  }
}`,
          },
          {
            name: 'auth.service.ts',
            type: 'file',
            language: 'typescript',
            code: `<span class="token-keyword">import</span> { <span class="token-type">Injectable</span> } <span class="token-keyword">from</span> <span class="token-string">'@angular/core'</span>;
<span class="token-keyword">import</span> { <span class="token-type">HttpClient</span> } <span class="token-keyword">from</span> <span class="token-string">'@angular/common/http'</span>;

<span class="token-comment">// 🔐 Service d'authentification JWT + Stripe</span>
<span class="token-comment">// Gère le cycle complet : login, register, refresh token</span>
<span class="token-decorator">@Injectable</span>({ <span class="token-variable">providedIn</span>: <span class="token-string">'root'</span> })
<span class="token-keyword">export class</span> <span class="token-type">AuthService</span> {
  <span class="token-keyword">private</span> <span class="token-variable">API_URL</span> = <span class="token-string">'api/v1/auth'</span>;

  <span class="token-keyword">constructor</span>(<span class="token-keyword">private</span> <span class="token-variable">http</span>: <span class="token-type">HttpClient</span>) {}

  <span class="token-function">login</span>(<span class="token-variable">email</span>: <span class="token-type">string</span>, <span class="token-variable">password</span>: <span class="token-type">string</span>) {
    <span class="token-keyword">return this</span>.<span class="token-variable">http</span>.<span class="token-function">post</span>(<span class="token-string">\`\${this.API_URL}/login\`</span>, {
      <span class="token-variable">email</span>, <span class="token-variable">password</span>
    });
  }

  <span class="token-function">checkToken</span>(): <span class="token-type">boolean</span> {
    <span class="token-keyword">const</span> <span class="token-variable">token</span> = localStorage.<span class="token-function">getItem</span>(<span class="token-string">'jwt_token'</span>);
    <span class="token-keyword">return</span> !!<span class="token-variable">token</span> && !<span class="token-keyword">this</span>.<span class="token-function">isExpired</span>(<span class="token-variable">token</span>);
  }
}`,
          },
          {
            name: 'dashboard.component.ts',
            type: 'file',
            language: 'typescript',
            code: `<span class="token-keyword">import</span> { <span class="token-type">Component</span> } <span class="token-keyword">from</span> <span class="token-string">'@angular/core'</span>;
<span class="token-keyword">import</span> { <span class="token-type">ChartModule</span> } <span class="token-keyword">from</span> <span class="token-string">'./charts/chart.module'</span>;

<span class="token-comment">// 📊 Tableau de bord analytics avec graphiques interactifs</span>
<span class="token-comment">// Données temps réel via WebSocket</span>
<span class="token-decorator">@Component</span>({
  <span class="token-variable">selector</span>: <span class="token-string">'app-dashboard'</span>,
  <span class="token-variable">template</span>: <span class="token-string">\`
    &lt;div class="grid grid-cols-3 gap-4"&gt;
      &lt;app-kpi-card *ngFor="let kpi of kpis" [data]="kpi" /&gt;
      &lt;app-chart [config]="chartConfig" /&gt;
      &lt;app-data-table [source]="dataSource" /&gt;
    &lt;/div&gt;
  \`</span>
})
<span class="token-keyword">export class</span> <span class="token-type">DashboardComponent</span> {
  <span class="token-variable">kpis</span> = [
    { <span class="token-variable">label</span>: <span class="token-string">'Revenue'</span>, <span class="token-variable">value</span>: <span class="token-number">124500</span>, <span class="token-variable">trend</span>: <span class="token-number">+12.5</span> },
    { <span class="token-variable">label</span>: <span class="token-string">'Users'</span>, <span class="token-variable">value</span>: <span class="token-number">8930</span>, <span class="token-variable">trend</span>: <span class="token-number">+8.2</span> },
    { <span class="token-variable">label</span>: <span class="token-string">'Conversion'</span>, <span class="token-variable">value</span>: <span class="token-number">3.4</span>, <span class="token-variable">trend</span>: <span class="token-number">+1.1</span> }
  ];
}`,
          },
        ],
      },
    ],
  },
  {
    name: 'backend-python',
    type: 'folder',
    children: [
      {
        name: 'app',
        type: 'folder',
        children: [
          {
            name: 'main.py',
            type: 'file',
            language: 'python',
            code: `<span class="token-keyword">from</span> <span class="token-type">fastapi</span> <span class="token-keyword">import</span> <span class="token-type">FastAPI</span>, <span class="token-type">Depends</span>
<span class="token-keyword">from</span> <span class="token-type">app.routers</span> <span class="token-keyword">import</span> auth, analytics, ai_engine
<span class="token-keyword">from</span> <span class="token-type">app.middleware</span> <span class="token-keyword">import</span> <span class="token-type">CORSMiddleware</span>, <span class="token-type">RateLimiter</span>

<span class="token-comment"># 🐍 API FastAPI — Point d'entrée principal</span>
<span class="token-comment"># Configuration CORS, rate limiting et auth JWT inclus</span>

<span class="token-variable">app</span> = <span class="token-type">FastAPI</span>(
    <span class="token-variable">title</span>=<span class="token-string">"SaaS-Data Engine API"</span>,
    <span class="token-variable">version</span>=<span class="token-string">"2.0.0"</span>,
    <span class="token-variable">docs_url</span>=<span class="token-string">"/api/docs"</span>
)

<span class="token-comment"># Middlewares de sécurité pré-configurés</span>
<span class="token-variable">app</span>.<span class="token-function">add_middleware</span>(<span class="token-type">CORSMiddleware</span>, <span class="token-variable">origins</span>=[<span class="token-string">"*"</span>])
<span class="token-variable">app</span>.<span class="token-function">add_middleware</span>(<span class="token-type">RateLimiter</span>, <span class="token-variable">max_requests</span>=<span class="token-number">100</span>)

<span class="token-comment"># Routes modulaires</span>
<span class="token-variable">app</span>.<span class="token-function">include_router</span>(auth.<span class="token-variable">router</span>, <span class="token-variable">prefix</span>=<span class="token-string">"/api/v1/auth"</span>)
<span class="token-variable">app</span>.<span class="token-function">include_router</span>(analytics.<span class="token-variable">router</span>, <span class="token-variable">prefix</span>=<span class="token-string">"/api/v1/data"</span>)
<span class="token-variable">app</span>.<span class="token-function">include_router</span>(ai_engine.<span class="token-variable">router</span>, <span class="token-variable">prefix</span>=<span class="token-string">"/api/v1/ai"</span>)

<span class="token-decorator">@app.get</span>(<span class="token-string">"/"</span>)
<span class="token-keyword">async def</span> <span class="token-function">health_check</span>():
    <span class="token-keyword">return</span> {<span class="token-string">"status"</span>: <span class="token-string">"operational"</span>, <span class="token-string">"version"</span>: <span class="token-string">"2.0.0"</span>}`,
          },
          {
            name: 'ai_engine.py',
            type: 'file',
            language: 'python',
            code: `<span class="token-keyword">import</span> <span class="token-type">pandas</span> <span class="token-keyword">as</span> pd
<span class="token-keyword">from</span> <span class="token-type">sklearn.ensemble</span> <span class="token-keyword">import</span> <span class="token-type">RandomForestClassifier</span>
<span class="token-keyword">from</span> <span class="token-type">app.services.pdf_generator</span> <span class="token-keyword">import</span> <span class="token-type">ReportBuilder</span>

<span class="token-comment"># 🧠 Moteur IA — Auto-ML & Génération de rapports</span>
<span class="token-comment"># Analyse automatique, feature engineering, prédictions</span>

<span class="token-keyword">class</span> <span class="token-type">AIDecisionEngine</span>:
    <span class="token-keyword">def</span> <span class="token-function">__init__</span>(<span class="token-variable">self</span>):
        <span class="token-variable">self</span>.<span class="token-variable">model</span> = <span class="token-type">RandomForestClassifier</span>(
            <span class="token-variable">n_estimators</span>=<span class="token-number">200</span>,
            <span class="token-variable">max_depth</span>=<span class="token-number">10</span>,
            <span class="token-variable">random_state</span>=<span class="token-number">42</span>
        )
        <span class="token-variable">self</span>.<span class="token-variable">report</span> = <span class="token-type">ReportBuilder</span>()

    <span class="token-keyword">async def</span> <span class="token-function">auto_analyze</span>(<span class="token-variable">self</span>, <span class="token-variable">df</span>: pd.<span class="token-type">DataFrame</span>):
        <span class="token-string">"""Auto-EDA + Feature Engineering complet"""</span>
        <span class="token-variable">features</span> = <span class="token-variable">self</span>.<span class="token-function">_extract_features</span>(<span class="token-variable">df</span>)
        <span class="token-variable">predictions</span> = <span class="token-variable">self</span>.<span class="token-variable">model</span>.<span class="token-function">predict</span>(<span class="token-variable">features</span>)
        
        <span class="token-comment"># Génération automatique du rapport PDF</span>
        <span class="token-variable">report_path</span> = <span class="token-variable">self</span>.<span class="token-variable">report</span>.<span class="token-function">generate</span>(
            <span class="token-variable">data</span>=<span class="token-variable">df</span>,
            <span class="token-variable">predictions</span>=<span class="token-variable">predictions</span>,
            <span class="token-variable">format</span>=<span class="token-string">"executive"</span>
        )
        <span class="token-keyword">return</span> {<span class="token-string">"report"</span>: <span class="token-variable">report_path</span>, <span class="token-string">"score"</span>: <span class="token-number">0.94</span>}`,
          },
        ],
      },
      {
        name: 'requirements.txt',
        type: 'file',
        language: 'text',
        code: `<span class="token-comment"># 📦 Dépendances Python — Tout est versionné</span>
fastapi==<span class="token-number">0.104.1</span>
uvicorn==<span class="token-number">0.24.0</span>
pandas==<span class="token-number">2.1.4</span>
scikit-learn==<span class="token-number">1.3.2</span>
openpyxl==<span class="token-number">3.1.2</span>
python-jose[cryptography]==<span class="token-number">3.3.0</span>
stripe==<span class="token-number">7.8.0</span>
reportlab==<span class="token-number">4.0.8</span>
sqlalchemy==<span class="token-number">2.0.23</span>
alembic==<span class="token-number">1.13.0</span>
redis==<span class="token-number">5.0.1</span>
celery==<span class="token-number">5.3.6</span>`,
      },
    ],
  },
  {
    name: 'docker-compose.yml',
    type: 'file',
    language: 'yaml',
    code: `<span class="token-comment"># 🐳 Docker Compose — Orchestration complète</span>
<span class="token-comment"># Un seul "docker compose up" pour tout lancer</span>

<span class="token-keyword">version</span>: <span class="token-string">"3.9"</span>

<span class="token-keyword">services</span>:
  <span class="token-type">frontend</span>:
    <span class="token-keyword">build</span>: <span class="token-string">./frontend-angular</span>
    <span class="token-keyword">ports</span>:
      - <span class="token-string">"4200:80"</span>
    <span class="token-keyword">depends_on</span>:
      - <span class="token-type">backend</span>

  <span class="token-type">backend</span>:
    <span class="token-keyword">build</span>: <span class="token-string">./backend-python</span>
    <span class="token-keyword">ports</span>:
      - <span class="token-string">"8000:8000"</span>
    <span class="token-keyword">environment</span>:
      - <span class="token-variable">DATABASE_URL</span>=<span class="token-string">postgresql://postgres:secret@db/saas_data_engine</span>
      - <span class="token-variable">STRIPE_SECRET_KEY</span>=<span class="token-string">\${STRIPE_KEY}</span>
      - <span class="token-variable">JWT_SECRET</span>=<span class="token-string">\${JWT_SECRET}</span>
    <span class="token-keyword">depends_on</span>:
      - <span class="token-type">db</span>
      - <span class="token-type">redis</span>

  <span class="token-type">db</span>:
    <span class="token-keyword">image</span>: <span class="token-string">postgres:16-alpine</span>
    <span class="token-keyword">volumes</span>:
      - <span class="token-string">pgdata:/var/lib/postgresql/data</span>

  <span class="token-type">redis</span>:
    <span class="token-keyword">image</span>: <span class="token-string">redis:7-alpine</span>
    <span class="token-keyword">ports</span>:
      - <span class="token-string">"6379:6379"</span>

<span class="token-keyword">volumes</span>:
  <span class="token-type">pgdata</span>:`,
  },
  {
    name: '.env.example',
    type: 'file',
    language: 'text',
    code: `<span class="token-comment"># 🔑 Variables d'environnement — Copier vers .env</span>
<span class="token-variable">STRIPE_KEY</span>=sk_test_xxxxxxxxxxxx
<span class="token-variable">STRIPE_WEBHOOK_SECRET</span>=whsec_xxxxxxxxxxxx
<span class="token-variable">JWT_SECRET</span>=votre-secret-jwt-super-securise
<span class="token-variable">DATABASE_URL</span>=postgresql://postgres:secret@localhost/saas_data_engine
<span class="token-variable">REDIS_URL</span>=redis://localhost:6379
<span class="token-variable">AI_MODEL_PATH</span>=./models/trained/
<span class="token-variable">PDF_OUTPUT_DIR</span>=./reports/generated/`,
  },
];

function FileTreeItem({
  node,
  depth = 0,
  selectedFile,
  onSelect,
}: {
  node: FileNode;
  depth?: number;
  selectedFile: string | null;
  onSelect: (node: FileNode) => void;
}) {
  const [open, setOpen] = useState(depth < 2);
  const isFolder = node.type === 'folder';
  const isSelected = selectedFile === node.name;

  return (
    <div>
      <button
        onClick={() => {
          if (isFolder) setOpen(!open);
          else onSelect(node);
        }}
        className={`w-full flex items-center gap-1.5 px-2 py-1 text-xs font-mono rounded transition-colors ${
          isSelected
            ? 'bg-teal-500/15 text-teal-400'
            : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-300'
        }`}
        style={{ paddingLeft: `${depth * 14 + 8}px` }}
      >
        {isFolder ? (
          <>
            {open ? (
              <ChevronDown className="w-3 h-3 flex-shrink-0 text-slate-600" />
            ) : (
              <ChevronRight className="w-3 h-3 flex-shrink-0 text-slate-600" />
            )}
            {open ? (
              <FolderOpen className="w-3.5 h-3.5 flex-shrink-0 text-teal-500" />
            ) : (
              <Folder className="w-3.5 h-3.5 flex-shrink-0 text-teal-600" />
            )}
          </>
        ) : (
          <>
            <span className="w-3 flex-shrink-0" />
            <FileCode className="w-3.5 h-3.5 flex-shrink-0 text-slate-600" />
          </>
        )}
        <span className="truncate">{node.name}</span>
      </button>
      {isFolder && open && node.children && (
        <div>
          {node.children.map((child) => (
            <FileTreeItem
              key={child.name}
              node={child}
              depth={depth + 1}
              selectedFile={selectedFile}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ArchitectureExplorer() {
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);

  // Auto-select first file
  const defaultFile = FILE_TREE[0]?.children?.[0]?.children?.[0];

  const current = selectedFile || defaultFile || null;

  return (
    <section id="architecture" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-700 bg-slate-800/50 text-xs font-medium text-slate-400 mb-4">
            <FileText className="w-3 h-3" />
            EXPLORATEUR D'ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Du code <span className="text-teal-400">propre et professionnel</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Explorez l'arborescence complète du projet. Chaque fichier est documenté,
            testé et prêt pour la production.
          </p>
        </div>

        {/* Code Editor */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/60 border-b border-slate-700/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 flex items-center justify-center gap-2">
                <Box className="w-3.5 h-3.5 text-teal-500" />
                <span className="text-xs text-slate-500 font-mono">
                  saas-data-engine /{' '}
                  <span className="text-teal-400">{current?.name || '...'}</span>
                </span>
              </div>
            </div>

            <div className="flex min-h-[450px] max-h-[550px]">
              {/* File tree */}
              <div className="w-64 border-r border-slate-700/50 overflow-y-auto bg-slate-900/40 py-2">
                <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Explorer
                </div>
                {FILE_TREE.map((node) => (
                  <FileTreeItem
                    key={node.name}
                    node={node}
                    selectedFile={current?.name || null}
                    onSelect={setSelectedFile}
                  />
                ))}
              </div>

              {/* Code view */}
              <div className="flex-1 overflow-auto p-5">
                {current?.code ? (
                  <pre className="text-[13px] leading-6 font-mono">
                    <code dangerouslySetInnerHTML={{ __html: current.code }} />
                  </pre>
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-600 text-sm">
                    ← Sélectionnez un fichier pour voir le code
                  </div>
                )}
              </div>
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between px-4 py-1.5 bg-slate-800/40 border-t border-slate-700/50 text-[10px] font-mono text-slate-600">
              <div className="flex items-center gap-4">
                <span>UTF-8</span>
                <span>{current?.language || 'plaintext'}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-teal-500">● Formé & Testé</span>
                <span>Ln 1, Col 1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
