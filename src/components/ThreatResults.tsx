import { Shield, AlertTriangle, CheckCircle, Download, Share, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ScanResult {
  engine: string;
  status: 'clean' | 'threat' | 'scanning';
  threat?: string;
}

interface ThreatResultsProps {
  fileName: string;
  fileSize: number;
  results: ScanResult[];
  onNewScan: () => void;
}

export const ThreatResults = ({ fileName, fileSize, results, onNewScan }: ThreatResultsProps) => {
  const threatCount = results.filter(r => r.status === 'threat').length;
  const cleanCount = results.filter(r => r.status === 'clean').length;
  const totalEngines = results.length;
  
  const overallStatus = threatCount > 0 ? 'threat' : 'clean';
  
  const riskLevel = threatCount === 0 ? 'Clean' : 
                   threatCount <= 2 ? 'Low Risk' :
                   threatCount <= 5 ? 'Medium Risk' : 'High Risk';

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Clean': return 'text-success';
      case 'Low Risk': return 'text-warning';
      case 'Medium Risk': return 'text-orange-500';
      case 'High Risk': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className={`border-2 ${overallStatus === 'threat' ? 'border-destructive/50 bg-destructive/5' : 'border-success/50 bg-success/5'}`}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {overallStatus === 'threat' ? (
                <div className="rounded-full p-3 bg-destructive/20">
                  <AlertTriangle className="h-8 w-8 text-destructive animate-quantum-pulse" />
                </div>
              ) : (
                <div className="rounded-full p-3 bg-success/20">
                  <Shield className="h-8 w-8 text-success animate-quantum-pulse" />
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold">
                  {overallStatus === 'threat' ? 'Threats Detected' : 'File is Clean'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Quantum analysis completed
                </p>
              </div>
            </div>
            <Badge 
              variant={overallStatus === 'threat' ? 'destructive' : 'secondary'}
              className={`text-lg px-4 py-2 ${overallStatus === 'clean' ? 'bg-success/20 text-success' : ''}`}
            >
              {riskLevel}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">File Details</p>
              <div className="space-y-1">
                <p className="font-semibold truncate">{fileName}</p>
                <p className="text-sm text-muted-foreground">
                  {(fileSize / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Scan Results</p>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-destructive">{threatCount}</p>
                  <p className="text-xs text-muted-foreground">Threats</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">{cleanCount}</p>
                  <p className="text-xs text-muted-foreground">Clean</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{totalEngines}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Risk Assessment</p>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${overallStatus === 'threat' ? 'bg-destructive animate-quantum-pulse' : 'bg-success'}`} />
                <span className={`font-semibold ${getRiskColor(riskLevel)}`}>
                  {riskLevel}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button variant="quantum" onClick={onNewScan}>
          Scan Another File
        </Button>
        <Button variant="cyber">
          <Download className="h-4 w-4" />
          Download Report
        </Button>
        <Button variant="cyber">
          <Share className="h-4 w-4" />
          Share Results
        </Button>
        {overallStatus === 'threat' && (
          <Button variant="threat">
            <Trash2 className="h-4 w-4" />
            Quarantine File
          </Button>
        )}
      </div>

      {/* Detailed Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>Detailed Engine Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.map((result, index) => (
              <div key={index}>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/5 border border-muted/10">
                  <div className="flex items-center space-x-4">
                    {result.status === 'clean' ? (
                      <CheckCircle className="h-6 w-6 text-success" />
                    ) : (
                      <AlertTriangle className="h-6 w-6 text-destructive" />
                    )}
                    <div>
                      <p className="font-semibold">{result.engine}</p>
                      {result.threat && (
                        <p className="text-sm text-destructive font-medium">
                          {result.threat}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {result.status === 'clean' ? 'No threats detected' : 'Threat identified'}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant={result.status === 'clean' ? 'secondary' : 'destructive'}
                    className={result.status === 'clean' ? 'bg-success/20 text-success' : ''}
                  >
                    {result.status === 'clean' ? 'Clean' : 'Threat'}
                  </Badge>
                </div>
                {index < results.length - 1 && <Separator className="opacity-30" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {overallStatus === 'threat' && (
        <Card className="border-warning/50 bg-warning/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-warning">
              <AlertTriangle className="h-5 w-5" />
              <span>Security Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-warning mt-2" />
                <span>Do not execute or open this file on your system</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-warning mt-2" />
                <span>Consider quarantining the file immediately</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-warning mt-2" />
                <span>Run a full system scan if this file was already executed</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-warning mt-2" />
                <span>Report the threat to your security team</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};