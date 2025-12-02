import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function BookingForm() {
  const [date, setDate] = useState<Date>();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [contact, setContact] = useState('');
  const [sessionType, setSessionType] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const availableTimeSlots = [
    '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !name || !age || !contact || !sessionType || !timeSlot) {
      toast({
        title: 'Заполните все поля',
        description: 'Пожалуйста, укажите все необходимые данные для записи',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: 'Заявка отправлена! ✅',
        description: `Мы свяжемся с вами по контакту: ${contact}`,
        duration: 5000
      });

      setDate(undefined);
      setName('');
      setAge('');
      setContact('');
      setSessionType('');
      setTimeSlot('');
      setMessage('');
    }, 1500);
  };

  return (
    <Card className="border-2 rounded-2xl">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Icon name="Calendar" size={24} className="text-primary" />
          Записаться на консультацию
        </CardTitle>
        <CardDescription className="text-base">
          Заполните форму, и мы свяжемся с вами для подтверждения
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-semibold">
                Имя <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-base font-semibold">
                Возраст <span className="text-destructive">*</span>
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="Ваш возраст"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="h-11 rounded-xl"
                min="12"
                max="25"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact" className="text-base font-semibold">
              Контакт для связи <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contact"
              placeholder="Телефон или Telegram"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="h-11 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-base font-semibold">
              Тип консультации <span className="text-destructive">*</span>
            </Label>
            <Select value={sessionType} onValueChange={setSessionType}>
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue placeholder="Выберите тип" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Индивидуальная консультация</SelectItem>
                <SelectItem value="group">Групповая сессия</SelectItem>
                <SelectItem value="first">Первичная консультация (бесплатно)</SelectItem>
                <SelectItem value="family">Семейная консультация</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-base font-semibold">
                Дата <span className="text-destructive">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full h-11 justify-start text-left font-normal rounded-xl"
                  >
                    <Icon name="Calendar" size={18} className="mr-2" />
                    {date ? format(date, 'dd MMMM yyyy', { locale: ru }) : 'Выберите дату'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    locale={ru}
                    disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="text-base font-semibold">
                Время <span className="text-destructive">*</span>
              </Label>
              <Select value={timeSlot} onValueChange={setTimeSlot}>
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue placeholder="Выберите время" />
                </SelectTrigger>
                <SelectContent>
                  {availableTimeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-base font-semibold">
              Дополнительная информация (необязательно)
            </Label>
            <Textarea
              id="message"
              placeholder="Расскажите, что вас беспокоит или какие вопросы вы хотели бы обсудить..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px] rounded-xl resize-none"
            />
          </div>

          <div className="bg-secondary/30 rounded-xl p-4 space-y-2">
            <div className="flex items-start gap-2">
              <Icon name="Shield" size={20} className="text-primary mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Конфиденциальность</p>
                <p className="text-sm text-muted-foreground">
                  Все данные защищены и не передаются третьим лицам
                </p>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full rounded-full shadow-lg hover:shadow-xl transition-all"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                Отправка...
              </>
            ) : (
              <>
                <Icon name="Send" size={20} className="mr-2" />
                Отправить заявку
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
