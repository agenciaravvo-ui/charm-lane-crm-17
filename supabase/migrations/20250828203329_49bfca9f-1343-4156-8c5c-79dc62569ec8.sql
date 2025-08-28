-- Verificar se a confirmação de email pode estar causando problemas
-- Vamos também melhorar a função de handle_new_user para ser mais robusta

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Log para debug
  RAISE LOG 'Tentando criar perfil para usuário: %', NEW.id;
  
  -- Inserir profile
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', 'Usuário')
  );
  
  RAISE LOG 'Perfil criado com sucesso para: %', NEW.email;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'Erro ao criar perfil: % %', SQLERRM, SQLSTATE;
    -- Não impedir o cadastro mesmo se falhar a criação do perfil
    RETURN NEW;
END;
$$;