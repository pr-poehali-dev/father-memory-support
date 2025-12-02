import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import BookingForm from '@/components/BookingForm';

type Section = 'home' | 'stories' | 'about' | 'psychologist' | 'contacts' | 'profile';

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const progress = 65;
  const sessionsCompleted = 5;

  const stories = [
    {
      name: 'Даниил, 17 лет',
      text: 'Первые месяцы я не мог даже говорить об этом. Психолог помог мне понять, что горевать — это нормально. Сейчас я веду дневник и пишу письма отцу. Это помогает мне чувствовать его рядом и двигаться дальше.',
      achievement: 'Поступил в IT-колледж'
    },
    {
      name: 'София, 15 лет',
      text: 'Когда папы не стало, я замкнулась в себе. В нашем сообществе я встретила ребят, которые меня понимают без слов. Мы вместе учимся жить с этой болью. Теперь я знаю — я не одна, и это даёт силы.',
      achievement: 'Стала наставником для новичков'
    },
    {
      name: 'Максим, 16 лет',
      text: 'Отец всегда говорил: "Будь сильным, помогай слабым". Я записался волонтёром в приют для животных — это то, что мы мечтали сделать вместе. Каждый раз, когда помогаю другим, я чувствую, что продолжаю его дело.',
      achievement: 'Волонтёр года в приюте'
    },
    {
      name: 'Анна, 14 лет',
      text: 'Мне было страшно остаться без папиной поддержки перед экзаменами. Психолог научила меня техникам дыхания и помогла поверить в себя. Я сдала экзамены на отлично. Знаю, что папа гордился бы мной.',
      achievement: 'Отличница в школе'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/20">
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 animate-fade-in">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center shadow-lg">
                <Icon name="Heart" size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Тепло дома
              </h1>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              {[
                { id: 'home' as Section, label: 'Главная', icon: 'Home' },
                { id: 'stories' as Section, label: 'Истории', icon: 'BookOpen' },
                { id: 'about' as Section, label: 'О нас', icon: 'Users' },
                { id: 'psychologist' as Section, label: 'Психолог', icon: 'Heart' },
                { id: 'contacts' as Section, label: 'Контакты', icon: 'Mail' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-primary text-white shadow-md'
                      : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item.icon as any} size={18} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  if (!isProfileOpen) setActiveSection('profile');
                }}
                variant="outline"
                size="sm"
                className="hidden md:flex rounded-full border-2 hover:border-primary transition-all"
              >
                <Icon name="User" size={18} className="mr-2" />
                Профиль
              </Button>

              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="md:hidden rounded-xl border-2"
                  >
                    <Icon name="Menu" size={20} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                        <Icon name="Heart" size={16} className="text-white" />
                      </div>
                      Тепло дома
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 space-y-2">
                    {[
                      { id: 'home' as Section, label: 'Главная', icon: 'Home' },
                      { id: 'stories' as Section, label: 'Истории', icon: 'BookOpen' },
                      { id: 'about' as Section, label: 'О нас', icon: 'Users' },
                      { id: 'psychologist' as Section, label: 'Психолог', icon: 'Heart' },
                      { id: 'contacts' as Section, label: 'Контакты', icon: 'Mail' },
                      { id: 'profile' as Section, label: 'Профиль', icon: 'User' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveSection(item.id);
                          setIsMobileMenuOpen(false);
                          if (item.id === 'profile') setIsProfileOpen(true);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                          activeSection === item.id
                            ? 'bg-primary text-white shadow-md'
                            : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon name={item.icon as any} size={20} />
                        <span className="font-medium text-base">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12 animate-fade-in">
        {activeSection === 'home' && (
          <div className="space-y-16">
            <section className="text-center max-w-4xl mx-auto space-y-6 animate-scale-in">
              <div className="inline-block p-4 bg-primary/10 rounded-3xl mb-4">
                <Icon name="Sparkles" size={48} className="text-primary" />
              </div>
              <h2 className="text-5xl font-bold leading-tight">
                Добро пожаловать в безопасное пространство
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Мы создаем место, где подростки, пережившие потерю отца, могут найти поддержку, 
                понимание и новый смысл. Память об отце — это твоя внутренняя сила для великих свершений.
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Button 
                  size="lg" 
                  className="rounded-full shadow-lg hover:shadow-xl transition-all"
                  onClick={() => {
                    setActiveSection('psychologist');
                    setShowBookingForm(true);
                  }}
                >
                  <Icon name="Calendar" size={20} className="mr-2" />
                  Записаться к психологу
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full"
                  onClick={() => setActiveSection('stories')}
                >
                  <Icon name="BookOpen" size={20} className="mr-2" />
                  Читать истории
                </Button>
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-6">
              {[
                { icon: 'Shield', title: 'Безопасность', desc: 'Конфиденциальность и защита твоих данных' },
                { icon: 'Users', title: 'Сообщество', desc: 'Друзья, которые тебя понимают' },
                { icon: 'Sparkles', title: 'Развитие', desc: 'Твой рост и новые достижения' }
              ].map((feature, idx) => (
                <Card 
                  key={idx} 
                  className="border-2 hover:border-primary hover:shadow-lg transition-all duration-300 rounded-2xl"
                >
                  <CardHeader className="text-center pb-3">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mb-4">
                      <Icon name={feature.icon as any} size={32} className="text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </section>
          </div>
        )}

        {activeSection === 'stories' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl font-bold">Истории силы</h2>
              <p className="text-xl text-muted-foreground">
                Реальные истории ребят, которые превратили боль в силу для достижений
              </p>
            </div>

            <div className="space-y-6">
              {stories.map((story, idx) => (
                <Card 
                  key={idx} 
                  className="border-2 hover:border-primary transition-all duration-300 rounded-2xl overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16 border-2 border-primary/20">
                        <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                          {story.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-2xl">{story.name}</CardTitle>
                        <Badge className="mt-2 bg-primary/10 text-primary hover:bg-primary/20">
                          {story.achievement}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-lg leading-relaxed text-muted-foreground italic">
                      "{story.text}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold">О нашем сообществе</h2>
              <p className="text-xl text-muted-foreground">
                Мы создаем пространство для роста и поддержки
              </p>
            </div>

            <Card className="border-2 rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 pb-8">
                <CardTitle className="text-3xl text-center">Наша миссия</CardTitle>
              </CardHeader>
              <CardContent className="pt-8 space-y-6">
                <p className="text-lg leading-relaxed">
                  Мы создаем безопасное цифровое пространство, где подростки, пережившие тяжелую утрату своих отцов, 
                  могут найти не только психологическую помощь, но и новый смысл, друзей и ориентиры для жизни.
                </p>
                <p className="text-lg leading-relaxed">
                  Мы верим, что память об отце может стать источником внутренней силы для великих свершений.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 rounded-2xl">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                    <Icon name="Heart" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Ценности</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {['Эмпатия и забота', 'Безопасность', 'Конфиденциальность', 'Взаимоподдержка'].map((value) => (
                      <li key={value} className="flex items-center gap-2">
                        <Icon name="Check" size={20} className="text-primary" />
                        <span>{value}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 rounded-2xl">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/30 rounded-xl flex items-center justify-center mb-3">
                    <Icon name="Target" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Наши цели</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {['Психологическая поддержка', 'Создание сообщества', 'Развитие потенциала', 'Новые возможности'].map((goal) => (
                      <li key={goal} className="flex items-center gap-2">
                        <Icon name="Sparkles" size={20} className="text-primary" />
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'psychologist' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl font-bold">Психологическая поддержка</h2>
              <p className="text-xl text-muted-foreground">
                Профессиональная помощь в безопасной и комфортной обстановке
              </p>
            </div>

            <Card className="border-2 rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                <div className="flex items-center gap-6">
                  <Avatar className="w-24 h-24 border-4 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary text-3xl font-bold">
                      ПС
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">Команда психологов</CardTitle>
                    <CardDescription className="text-base mt-2">
                      Специалисты по работе с подростками и переживанием утраты
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Icon name="CheckCircle" size={20} className="text-primary" />
                      Что мы предлагаем
                    </h3>
                    <ul className="space-y-2 ml-7">
                      <li>• Индивидуальные консультации</li>
                      <li>• Групповые сессии</li>
                      <li>• Онлайн-встречи</li>
                      <li>• Анонимная поддержка</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Icon name="Clock" size={20} className="text-primary" />
                      Как это работает
                    </h3>
                    <ul className="space-y-2 ml-7">
                      <li>• Запись онлайн</li>
                      <li>• Выбор удобного времени</li>
                      <li>• Конфиденциальность</li>
                      <li>• Отслеживание прогресса</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {showBookingForm && (
              <div className="animate-fade-in">
                <BookingForm />
              </div>
            )}

            {!showBookingForm && (
              <div className="text-center">
                <Button 
                  size="lg" 
                  className="rounded-full shadow-lg hover:shadow-xl transition-all"
                  onClick={() => setShowBookingForm(true)}
                >
                  <Icon name="Calendar" size={20} className="mr-2" />
                  Открыть форму записи
                </Button>
              </div>
            )}
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl font-bold">Свяжитесь с нами</h2>
              <p className="text-xl text-muted-foreground">
                Мы всегда готовы помочь и ответить на ваши вопросы
              </p>
            </div>

            <Card className="border-2 hover:border-primary transition-all rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Icon name="MessageCircle" size={32} className="text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Telegram бот</CardTitle>
                    <CardDescription className="text-base mt-2">
                      Напишите нам в любое время — мы всегда на связи
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <Button 
                  size="lg" 
                  className="w-full rounded-full shadow-lg hover:shadow-xl transition-all"
                  onClick={() => window.open('https://t.me/DominoDemoBot?start=w1952834697', '_blank')}
                >
                  <Icon name="Send" size={20} className="mr-2" />
                  Открыть Telegram бот
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'profile' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl font-bold">Личный кабинет</h2>
              <p className="text-xl text-muted-foreground">
                Твой прогресс и достижения
              </p>
            </div>

            <Card className="border-2 rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                <div className="flex items-center gap-6">
                  <Avatar className="w-20 h-20 border-4 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                      А
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">Александр</CardTitle>
                    <CardDescription className="text-base mt-1">
                      В сообществе с сентября 2024
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-8">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Прогресс развития</h3>
                    <span className="text-2xl font-bold text-primary">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    Отличная работа! Продолжай в том же духе 💪
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { icon: 'Calendar', label: 'Сессий пройдено', value: sessionsCompleted },
                    { icon: 'Trophy', label: 'Достижений', value: 8 },
                    { icon: 'Users', label: 'Друзей', value: 12 }
                  ].map((stat, idx) => (
                    <Card key={idx} className="border rounded-xl bg-gradient-to-br from-primary/5 to-accent/5">
                      <CardContent className="pt-6 text-center space-y-2">
                        <Icon name={stat.icon as any} size={32} className="text-primary mx-auto" />
                        <p className="text-3xl font-bold text-primary">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Icon name="BookOpen" size={20} className="text-primary" />
                    Записи сессий
                  </h3>
                  <div className="space-y-3">
                    {[
                      { date: '25 ноября 2024', topic: 'Работа с эмоциями', duration: '45 мин' },
                      { date: '18 ноября 2024', topic: 'Память и благодарность', duration: '50 мин' },
                      { date: '11 ноября 2024', topic: 'Постановка целей', duration: '40 мин' }
                    ].map((session, idx) => (
                      <Card key={idx} className="border rounded-xl hover:border-primary transition-all">
                        <CardContent className="pt-4 flex justify-between items-center">
                          <div>
                            <p className="font-semibold">{session.topic}</p>
                            <p className="text-sm text-muted-foreground">{session.date}</p>
                          </div>
                          <Badge variant="outline">{session.duration}</Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="mt-20 border-t bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                <Icon name="Heart" size={16} className="text-white" />
              </div>
              <span className="font-bold text-lg">Тепло дома</span>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Безопасное пространство для подростков. Память об отце — твоя внутренняя сила.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button variant="ghost" size="sm" className="rounded-full">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full">
                <Icon name="MessageCircle" size={20} />
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full">
                <Icon name="Mail" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}