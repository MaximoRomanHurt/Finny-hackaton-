function Home() {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1>¡Bienvenido!</h1>
        <p>Has iniciado sesión correctamente</p>
        <button onClick={() => window.history.back()}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default Home;