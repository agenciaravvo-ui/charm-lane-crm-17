import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Eye, EyeOff } from "lucide-react";

const signInSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const signUpSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(6, "Confirmação de senha obrigatória"),
  fullName: z.string().min(2, "Nome completo obrigatório"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"],
});

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
    },
  });

  const onSignIn = async (values: z.infer<typeof signInSchema>) => {
    setLoading(true);
    const { error } = await signIn(values.email, values.password);
    
    if (error) {
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: error.message === "Invalid login credentials" 
          ? "E-mail ou senha incorretos" 
          : "Erro ao fazer login. Tente novamente.",
      });
    } else {
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao Simple CRM",
      });
      navigate("/");
    }
    setLoading(false);
  };

  const onSignUp = async (values: z.infer<typeof signUpSchema>) => {
    console.log('Formulário de cadastro submetido:', values);
    setLoading(true);
    
    try {
      const { error } = await signUp(values.email, values.password, values.fullName);
      
      console.log('Resposta do signUp:', { error });
      
      if (error) {
        console.error('Erro detalhado no cadastro:', {
          message: error.message,
          status: error.status,
          statusText: error.statusText
        });
        
        let errorMessage = "Erro ao criar conta. Tente novamente.";
        
        if (error.message?.includes("already registered") || error.message?.includes("User already exists")) {
          errorMessage = "Este e-mail já está cadastrado";
        } else if (error.message?.includes("Invalid email")) {
          errorMessage = "E-mail inválido";
        } else if (error.message?.includes("Password")) {
          errorMessage = "Senha muito simples. Use pelo menos 6 caracteres";
        }
        
        toast({
          variant: "destructive",
          title: "Erro no cadastro",
          description: errorMessage,
        });
      } else {
        console.log('Cadastro realizado com sucesso');
        toast({
          title: "Conta criada com sucesso!",
          description: "Você pode fazer login agora",
        });
        setIsSignUp(false);
        
        // Limpar formulário
        signUpForm.reset();
      }
    } catch (err) {
      console.error('Erro crítico no cadastro:', err);
      toast({
        variant: "destructive",
        title: "Erro crítico",
        description: "Erro inesperado. Verifique sua conexão.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Simple CRM
          </h1>
          <p className="text-muted-foreground mt-2">
            Gerencie seus leads de forma inteligente
          </p>
        </div>

        <Card className="backdrop-blur-sm bg-card/80 border-border shadow-elegant">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold">
              {isSignUp ? "Criar conta" : "Entrar"}
            </CardTitle>
            <CardDescription>
              {isSignUp 
                ? "Preencha os dados para criar sua conta" 
                : "Entre com suas credenciais para acessar o sistema"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSignUp ? (
              <Form {...signUpForm}>
                <form onSubmit={signUpForm.handleSubmit(onSignUp)} className="space-y-4">
                  <FormField
                    control={signUpForm.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signUpForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="seu@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signUpForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="Sua senha" 
                              {...field} 
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signUpForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmar senha</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showConfirmPassword ? "text" : "password"} 
                              placeholder="Confirme sua senha" 
                              {...field} 
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Criando conta...
                      </>
                    ) : (
                      "Criar conta"
                    )}
                  </Button>
                </form>
              </Form>
            ) : (
              <Form {...signInForm}>
                <form onSubmit={signInForm.handleSubmit(onSignIn)} className="space-y-4">
                  <FormField
                    control={signInForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="seu@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signInForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="Sua senha" 
                              {...field} 
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Entrando...
                      </>
                    ) : (
                      "Entrar"
                    )}
                  </Button>
                </form>
              </Form>
            )}

            <div className="mt-6 text-center">
              <Button
                variant="link"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-muted-foreground hover:text-foreground"
              >
                {isSignUp 
                  ? "Já tem uma conta? Entre aqui" 
                  : "Não tem uma conta? Cadastre-se"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}