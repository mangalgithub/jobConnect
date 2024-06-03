import { Button, Label, TextInput } from "flowbite-react";
import {Link } from "react-router-dom"; 
const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="flex max-w-md flex-col gap-4">
        <div>
          <p className="text-4xl justify-center mb-4">Login To JobConnect</p>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="test@gmail.com"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput id="password1" type="password" required />
        </div>
        <Button type="submit">Login</Button>
        <div className="mt-4">
          Not signed up? <Link to="/" className="text-blue-600">Signup here</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
