import { useState, useEffect } from 'react';
import { Shield, Zap, Activity, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface ScanResult {
  engine: string;
  status: 'clean' | 'threat' | 'scanning';
  threat?: string;
}

interface ScanningDashboardProps {
  isScanning: boolean;
  fileName?: string;
  onScanComplete: (results: ScanResult[]) => void;
}

export const ScanningDashboard = ({ isScanning, fileName, onScanComplete }: ScanningDashboardProps) => {
  const [progress, setProgress] = useState(0);
  const [currentEngine, setCurrentEngine] = useState('');
  const [results, setResults] = useState<ScanResult[]>([]);

  const engines = [
    'Quantum Defense Engine',
    'Neural Threat Detector',
    'Behavioral Analysis Core',
    'Signature Scanner Pro',
    'Heuristic Analyzer',
    'Machine Learning Filter',
    'Crypto Verification',
    'Sandbox Emulator'
  ];

  useEffect(() => {
    if (!isScanning) {
      setProgress(0);
      setResults([]);
      return;
    }

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < engines.length) {
        setCurrentEngine(engines[currentStep]);
        setProgress((currentStep + 1) / engines.length * 100);
        
        // Simulate scan results
        const newResult: ScanResult = {
          engine: engines[currentStep],
          status: Math.random() > 0.9 ? 'threat' : 'clean',
          threat: Math.random() > 0.9 ? 'Trojan.Generic.Suspicious' : undefined
        };
        
        setResults(prev => [...prev, newResult]);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onScanComplete(results);
        }, 1000);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [isScanning, onScanComplete]);

  const threatCount = results.filter(r => r.status === 'threat').length;
  const cleanCount = results.filter(r => r.status === 'clean').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-primary/20 bg-gradient-cyber">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-3">
            <div className="rounded-full p-2 bg-primary/20">
              <Shield className="h-6 w-6 text-primary animate-quantum-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Quantum Threat Analysis</h2>
              {fileName && (
                <p className="text-sm text-muted-foreground mt-1">
                  Analyzing: {fileName}
                </p>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Scan Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            {isScanning && currentEngine && (
              <div className="flex items-center space-x-2 text-sm">
                <Zap className="h-4 w-4 text-primary animate-quantum-pulse" />
                <span>Running: {currentEngine}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Results */}
      {results.length > 0 && (
        <Card className="border-muted/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <span>Real-time Scan Results</span>
              <div className="flex space-x-2 ml-auto">
                <Badge variant="secondary" className="bg-success/20 text-success">
                  {cleanCount} Clean
                </Badge>
                {threatCount > 0 && (
                  <Badge variant="destructive">
                    {threatCount} Threats
                  </Badge>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/5 border border-muted/10"
                >
                  <div className="flex items-center space-x-3">
                    {result.status === 'clean' ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive" />
                    )}
                    <div>
                      <p className="font-medium text-sm">{result.engine}</p>
                      {result.threat && (
                        <p className="text-xs text-destructive">{result.threat}</p>
                      )}
                    </div>
                  </div>
                  <Badge 
                    variant={result.status === 'clean' ? 'secondary' : 'destructive'}
                    className={result.status === 'clean' ? 'bg-success/20 text-success' : ''}
                  >
                    {result.status === 'clean' ? 'Clean' : 'Threat'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="flex flex-col items-center space-y-2">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-primary">{engines.length}</p>
                <p className="text-sm text-muted-foreground">Security Engines</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <div className="flex flex-col items-center space-y-2">
              <CheckCircle className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold text-success">{cleanCount}</p>
                <p className="text-sm text-muted-foreground">Clean Results</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-4">
            <div className="flex flex-col items-center space-y-2">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-2xl font-bold text-destructive">{threatCount}</p>
                <p className="text-sm text-muted-foreground">Threats Found</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};