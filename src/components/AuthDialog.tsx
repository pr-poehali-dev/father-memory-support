import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthSuccess: (data: { action: string; name?: string; email: string; password: string; age?: string }) => void;
}

export default function AuthDialog({ open, onOpenChange, onAuthSuccess }: AuthDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerName, setRegisterName] = useState('');
  const [registerAge, setRegisterAge] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail || !loginPassword) {
      toast({
        title: 'Заполните все поля',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    onAuthSuccess({
      action: 'login',
      email: loginEmail,
      password: loginPassword
    });
    
    setIsLoading(false);
    setLoginEmail('');
    setLoginPassword('');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerName || !registerAge || !registerEmail || !registerPassword) {
      toast({
        title: 'Заполните все поля',
        variant: 'destructive'
      });
      return;
    }

    const age = parseInt(registerAge);
    if (age < 12 || age > 25) {
      toast({
        title: 'Возраст должен быть от 12 до 25 лет',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    onAuthSuccess({
      action: 'register',
      name: registerName,
      email: registerEmail,
      password: registerPassword,
      age: registerAge
    });
    
    setIsLoading(false);
    setRegisterName('');
    setRegisterAge('');
    setRegisterEmail('');
    setRegisterPassword('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
              <Icon name="Heart" size={20} className="text-white" />
            </div>
            Тепло дома
          </DialogTitle>
          <DialogDescription>
            Присоединяйтесь к нашему безопасному сообществу поддержки
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 mt-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Пароль</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>

              <Button
                type="submit"
                className="w-full rounded-full h-11"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                    Вход...
                  </>
                ) : (
                  <>
                    <Icon name="LogIn" size={18} className="mr-2" />
                    Войти
                  </>
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register" className="space-y-4 mt-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Имя</Label>
                <Input
                  id="register-name"
                  placeholder="Ваше имя"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-age">Возраст</Label>
                <Input
                  id="register-age"
                  type="number"
                  placeholder="Ваш возраст"
                  value={registerAge}
                  onChange={(e) => setRegisterAge(e.target.value)}
                  className="h-11 rounded-xl"
                  min="12"
                  max="25"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="your@email.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password">Пароль</Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="••••••••"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="bg-secondary/30 rounded-xl p-3 flex items-start gap-2">
                <Icon name="Shield" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Все данные защищены и используются только для вашей безопасности
                </p>
              </div>

              <Button
                type="submit"
                className="w-full rounded-full h-11"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                    Регистрация...
                  </>
                ) : (
                  <>
                    <Icon name="UserPlus" size={18} className="mr-2" />
                    Зарегистрироваться
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}