import { useState } from 'react';
import type { MinerConfig } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Save } from 'lucide-react';

interface ConfigPanelProps {
  config: MinerConfig;
  onSave: (config: MinerConfig) => void;
}

const ConfigPanel = ({ config, onSave }: ConfigPanelProps) => {
  const [draft, setDraft] = useState<MinerConfig>(config);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleChange = (field: keyof MinerConfig) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraft((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <Settings className="h-4 w-4 text-muted-foreground" />
          Cấu hình Kết nối
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Field label="Backend URL">
          <Input
            id="backend-url"
            type="url"
            placeholder="http://localhost:4021"
            value={draft.backendUrl}
            onChange={handleChange('backendUrl')}
          />
        </Field>

        <Field label="API Code">
          <Input
            id="api-code"
            type="password"
            placeholder="Nhập API Code từ tài khoản ClawQuest"
            value={draft.apiCode}
            onChange={handleChange('apiCode')}
          />
        </Field>

        <Button
          id="save-config-btn"
          className="w-full"
          variant={saved ? 'success' : 'outline'}
          onClick={handleSave}
        >
          <Save className="h-4 w-4" />
          {saved ? 'Đã lưu!' : 'Lưu cấu hình'}
        </Button>
      </CardContent>
    </Card>
  );
};

interface FieldProps {
  label: string;
  children: React.ReactNode;
}

const Field = ({ label, children }: FieldProps) => (
  <div className="space-y-1.5">
    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
      {label}
    </label>
    {children}
  </div>
);

export default ConfigPanel;
