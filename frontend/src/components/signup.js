import { Button, Label, TextInput } from "flowbite-react";
import {Link} from "react-router-dom";
const Signup = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="flex max-w-md flex-col gap-4">
        <div>
          <p className="text-4xl justify-center mb-4">Signup To JobConnect</p>
          <div className="mb-2 block">
            <Label htmlFor="role" value="Select the Role" />
          </div>
          <select id="role" required>
            <option value="recruiter">Recruiter</option>
            <option value="jobseeker">Jobseeker</option>
          </select>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Your name" />
          </div>
          <TextInput id="name" type="text" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="photo" value="Upload photo" />
          </div>
          <input id="photo" type="file" />
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
        <Button type="submit">Signup</Button>
        <div className="mt-4">
          Want to Login?{" "}
          <Link to="/login" className="text-blue-600">
            Login here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;