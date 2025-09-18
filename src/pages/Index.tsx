import { useState } from 'react';
import { Shield, Zap, Globe, Search, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { FileUploadZone } from '@/components/FileUploadZone';
import { ScanningDashboard } from '@/components/ScanningDashboard';
import { ThreatResults } from '@/components/ThreatResults';

interface ScanResult {
  engine: string;
  status: 'clean' | 'threat' | 'scanning';
  threat?: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('file');
  const [isScanning, setIsScanning] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [scanComplete, setScanComplete] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setScanComplete(false);
    setScanResults([]);
    setIsScanning(true);
  };

  const handleScanComplete = (results: ScanResult[]) => {
    setScanResults(results);
    setIsScanning(false);
    setScanComplete(true);
  };

  const handleNewScan = () => {
    setSelectedFile(null);
    setScanResults([]);
    setScanComplete(false);
    setIsScanning(false);
  };

  const handleUrlScan = () => {
    if (urlInput.trim()) {
      // Simulate URL scanning
      setIsScanning(true);
      setScanComplete(false);
      setTimeout(() => {
        const mockResults: ScanResult[] = [
          { engine: 'URL Reputation Scanner', status: 'clean' },
          { engine: 'Phishing Detector', status: 'clean' },
          { engine: 'Malware URL Filter', status: 'threat', threat: 'Suspicious.URL.Detected' }
        ];
        handleScanComplete(mockResults);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-gradient-quantum p-2 shadow-quantum">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-quantum bg-clip-text text-transparent">
                  QuantumGuard
                </h1>
                <p className="text-sm text-muted-foreground">
                  Advanced Cybersecurity Toolkit
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
              <Button variant="cyber" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {scanComplete && selectedFile ? (
          <ThreatResults
            fileName={selectedFile.name}
            fileSize={selectedFile.size}
            results={scanResults}
            onNewScan={handleNewScan}
          />
        ) : isScanning ? (
          <ScanningDashboard
            isScanning={isScanning}
            fileName={selectedFile?.name}
            onScanComplete={handleScanComplete}
          />
        ) : (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-6 py-12">
              <div className="flex justify-center">
                <div className="rounded-full bg-gradient-quantum p-6 shadow-quantum animate-quantum-glow">
                  <Zap className="h-16 w-16 text-white" />
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold">
                  <span className="bg-gradient-quantum bg-clip-text text-transparent">
                    Quantum-Enhanced
                  </span>
                  <br />
                  Threat Detection
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Analyze suspicious files, domains, IPs and URLs to detect malware and other breaches, 
                  automatically share them with the security community.
                </p>
              </div>
            </div>

            {/* Scan Interface */}
            <Card className="max-w-4xl mx-auto shadow-card">
              <CardContent className="p-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="file" className="text-center">
                      <Shield className="h-4 w-4 mr-2" />
                      FILE
                    </TabsTrigger>
                    <TabsTrigger value="url" className="text-center">
                      <Globe className="h-4 w-4 mr-2" />
                      URL
                    </TabsTrigger>
                    <TabsTrigger value="search" className="text-center">
                      <Search className="h-4 w-4 mr-2" />
                      SEARCH
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="file" className="space-y-6">
                    <FileUploadZone 
                      onFileSelect={handleFileSelect}
                      isScanning={isScanning}
                    />
                  </TabsContent>

                  <TabsContent value="url" className="space-y-6">
                    <div className="text-center space-y-6">
                      <div className="rounded-full p-6 bg-muted/10 inline-block">
                        <Globe className="h-12 w-12 text-primary" />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Scan a URL or Domain</h3>
                        <p className="text-muted-foreground">
                          Enter a URL or domain to check for malicious content
                        </p>
                        <div className="flex space-x-4 max-w-md mx-auto">
                          <Input
                            placeholder="Enter URL, IP address, or domain"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            className="flex-1"
                          />
                          <Button variant="quantum" onClick={handleUrlScan}>
                            Scan URL
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="search" className="space-y-6">
                    <div className="text-center space-y-6">
                      <div className="rounded-full p-6 bg-muted/10 inline-block">
                        <Search className="h-12 w-12 text-primary" />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Search Hash or Signature</h3>
                        <p className="text-muted-foreground">
                          Search our database for known file hashes or threat signatures
                        </p>
                        <div className="flex space-x-4 max-w-md mx-auto">
                          <Input
                            placeholder="Enter file hash (MD5, SHA1, SHA256)"
                            className="flex-1"
                          />
                          <Button variant="cyber">
                            Search
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-16">
              <Card className="text-center p-6 hover:shadow-quantum transition-all duration-300">
                <CardContent className="space-y-4">
                  <div className="rounded-full p-4 bg-primary/10 inline-block">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Advanced Protection</h3>
                  <p className="text-muted-foreground">
                    Multi-engine scanning with quantum-enhanced algorithms for superior threat detection
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 hover:shadow-purple transition-all duration-300">
                <CardContent className="space-y-4">
                  <div className="rounded-full p-4 bg-secondary/10 inline-block">
                    <Zap className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold">Lightning Fast</h3>
                  <p className="text-muted-foreground">
                    Real-time analysis with parallel processing for instant security insights
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 hover:shadow-quantum transition-all duration-300">
                <CardContent className="space-y-4">
                  <div className="rounded-full p-4 bg-accent/10 inline-block">
                    <Globe className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold">Global Intelligence</h3>
                  <p className="text-muted-foreground">
                    Community-driven threat intelligence sharing for collective security
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 QuantumGuard. Advanced cybersecurity powered by quantum algorithms.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
