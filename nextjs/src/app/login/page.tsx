import LoginForm from "./login-form";

interface Props {}

const Page = async ({}: Props) => {
  return (
    <div className="max-w-lg mx-auto">
        <LoginForm />
    </div>
  );
};

export default Page;
