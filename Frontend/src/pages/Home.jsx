import "./Home.css"; // ✅ Check this path
import Hero from "../components/Hero"; // ✅ Check this path
import Biography from "../components/Biography"; // ✅
import Departments from "../components/Departments"; // ✅
import MessageForm from "../components/MessageForm"; // ✅


const Home = () => {
  return (
    <div className="home-page">
      <Hero
        title={"स्वास्थ्य आपका, सेवा हमारी |"}
        imageUrl={"/photoes/home1.png"}
        className="home-hero"
      />
      <div className="home-biography">
        <Biography imageUrl={"/about.png"} />
      </div>
      <div className="home-departments">
        <Departments />
      </div>
      <div className="home-message-form">
        <MessageForm />
      </div>
    </div>
  );
};

export default Home; // ✅ this fixes the "does not provide an export named 'default'" error
