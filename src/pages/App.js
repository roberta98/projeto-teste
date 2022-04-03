import "../assets/App.css";

import Form from "../components/Form";

const App = () => {
  return (
    <div className="container col-lg-8 col-xs-12">
      <div className="row">
        <h1>Valide sua senha</h1>
        <Form />
      </div>
    </div>
  );
};

export default App;
