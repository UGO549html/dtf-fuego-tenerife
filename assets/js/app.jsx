const { useState, useEffect } = React;

// === ICONOS SVG ===
const IconWrapper = ({ children, size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {children}
  </svg>
);
const Zap = (p) => <IconWrapper {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></IconWrapper>;
const ShoppingCart = (p) => <IconWrapper {...p}><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 2-1.61L23 6H6"></path></IconWrapper>;
const Menu = (p) => <IconWrapper {...p}><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></IconWrapper>;
const X = (p) => <IconWrapper {...p}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></IconWrapper>;
const Printer = (p) => <IconWrapper {...p}><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></IconWrapper>;
const Shirt = (p) => <IconWrapper {...p}><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path></IconWrapper>;
const CheckCircle = (p) => <IconWrapper {...p}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></IconWrapper>;
const MapPin = (p) => <IconWrapper {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></IconWrapper>;
const Phone = (p) => <IconWrapper {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></IconWrapper>;
const Instagram = (p) => <IconWrapper {...p}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></IconWrapper>;

const App = () => {
  const [view, setView] = useState('home');
  const [cart, setCart] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('data/products.json')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => {
        setProducts([
          { id: 1, name: "Metro Lineal DTF (58cm)", price: 12.00, category: "Impresión", image: "assets/images/product-1.jpg", desc: "Sube tu Gang Sheet de 58x100cm. Calidad premium." },
          { id: 2, name: "Transfer A4 - Pack 10", price: 25.00, category: "Packs", image: "assets/images/product-2.jpg", desc: "10 hojas A4 con tus diseños." },
          { id: 3, name: "Logo Pecho (10cm) - x50", price: 40.00, category: "Etiquetas", image: "assets/images/product-3.jpg", desc: "Ideal para marcas de ropa." },
          { id: 4, name: "Diseño Personalizado", price: 15.00, category: "Servicios", image: "assets/images/product-4.jpg", desc: "Vectorización y acomodo." }
        ]);
      });
  }, []);

  const addToCart = (product) => {
    const exist = cart.find(x => x.id === product.id);
    if (exist) {
      setCart(cart.map(x => x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    const exist = cart.find(x => x.id === product.id);
    if (exist.qty === 1) {
      setCart(cart.filter(x => x.id !== product.id));
    } else {
      setCart(cart.map(x => x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x));
    }
  };

  const total = cart.reduce((a, c) => a + c.price * c.qty, 0);

  const checkoutWhatsApp = () => {
    let message = "Hola DTF FUEGO, quiero realizar el siguiente pedido:\n\n";
    cart.forEach(item => {
      message += `- ${item.name} (x${item.qty}): ${item.price * item.qty}€\n`;
    });
    message += `\nTotal: ${total.toFixed(2)}€\n\n¿Cómo procedemos con el envío de archivos?`;
    const url = `https://wa.me/34625286488?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // === NAVEGACIÓN ===
  const Nav = () => (
    <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 cursor-pointer flex items-center gap-2" onClick={() => setView('home')}>
            <img src="logo.png" alt="Logo DTF Fuego" className="w-12 h-12 object-contain logo-anim" />
            <span className="font-brand text-2xl tracking-wider text-white">
              DTF <span className="text-red-500">FUEGO</span>
            </span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button onClick={() => setView('home')} className={`hover:text-yellow-400 transition ${view === 'home' ? 'text-yellow-400' : 'text-gray-300'}`}>Inicio</button>
              <button onClick={() => setView('catalog')} className={`hover:text-yellow-400 transition ${view === 'catalog' ? 'text-yellow-400' : 'text-gray-300'}`}>Catálogo</button>
              <button onClick={() => setView('contact')} className={`hover:text-yellow-400 transition ${view === 'contact' ? 'text-yellow-400' : 'text-gray-300'}`}>Contacto</button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer hover:scale-110 transition" onClick={() => setView('cart')}>
              <ShoppingCart className="text-white" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                  {cart.reduce((a,c) => a + c.qty, 0)}
                </span>
              )}
            </div>
            <div className="-mr-2 flex md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-400 hover:text-white p-2">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={() => {setView('home'); setIsMenuOpen(false)}} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">Inicio</button>
            <button onClick={() => {setView('catalog'); setIsMenuOpen(false)}} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">Catálogo</button>
            <button onClick={() => {setView('contact'); setIsMenuOpen(false)}} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">Contacto</button>
          </div>
        </div>
      )}
    </nav>
  );

  // === HOME CON HERO ARREGLADO ===
  const Home = () => (
    <div className="animate-fade-in">
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* ← AQUÍ ESTÁ EL HERO QUE FALTABA */}
          <img 
            src="assets/images/hero-bg.jpg"
            alt="DTF Background" 
            className="w-full h-full object-cover opacity-30" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="text-white">IMPRESIÓN</span> <span className="font-brand text-gradient">DTF PREMIUM</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
            La calidad que tus prendas merecen, hecha en Tenerife.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setView('catalog')} className="btn-fuego px-8 py-4 rounded-full text-white font-bold text-lg shadowDRS-lg">
              VER CATÁLOGO
            </button>
            <button onClick={() => setView('contact')} className="px-8 py-4 rounded-full border-2 border-white text-white font-bold text-lg hover:bg-white hover:text-black transition">
              CONTACTAR
            </button>
          </div>
        </div>
      </div>

      <div className="py-16 bg-[#222]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-xl bg-[#1a1a1a] hover:bg-[#252525] transition border border-gray-800">
            <div className="flex justify-center mb-4"><Printer className="text-yellow-500" size={48} /></div>
            <h3 className="text-xl font-bold mb-2 text-white">Calidad Fotográfica</h3>
            <p className="text-gray-400">Colores vibrantes y detalles nítidos gracias a nuestra última tecnología.</p>
          </div>
          <div className="p-6 rounded-xl bg-[#1a1a1a] hover:bg-[#252525] transition border border-gray-800">
            <div className="flex justify-center mb-4"><Zap className="text-red-500" size={48} /></div>
            <h3 className="text-xl font-bold mb-2 text-white">Servicio Rápido</h3>
            <p className="text-gray-400">Entregas en tiempo récord en todo Tenerife.</p>
          </div>
          <div className="p-6 rounded-xl bg-[#1a1a1a] hover:bg-[#252525] transition border border-gray-800">
            <div className="flex justify-center mb-4"><Shirt className="text-pink-500" size={48} /></div>
            <h3 className="text-xl font-bold mb-2 text-white">Versatilidad Total</h3>
            <p className="text-gray-400">Algodón, poliéster, mezclas... Nuestros transfers pegan en todo.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const Catalog = () => (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-center text-gradient">NUESTROS PRODUCTOS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-[#222] rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-yellow-500 transition group">
            <div className="h-48 overflow-hidden relative">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">{product.category}</div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
              <p className="text-gray-400 text-sm mb-4 h-10 overflow-hidden">{product.desc}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-yellow-500">{product.price.toFixed(2)}€</span>
                <button onClick={() => addToCart(product)} className="bg-white text-black p-2 rounded-full hover:bg-yellow-400 transition">
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const Cart = () => (
    <div className="pt-24 pb-12 px-4 max-w-4xl mx-auto min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center">TU CESTA DE FUEGO</h2>
      {cart.length === 0 ? (
        <div className="text-center py-20 bg-[#222] rounded-xl border border-gray-800">
          <div className="flex justify-center mb-4"><ShoppingCart className="text-gray-600" size={64} /></div>
          <p className="text-xl text-gray-400 mb-6">La cesta está vacía</p>
          <button onClick={() => setView('catalog')} className="btn-fuego px-6 py-3 rounded-full text-white font-bold">
            IR AL CATÁLOGO
          </button>
        </div>
      ) : (
        <div className="bg-[#222] rounded-xl border border-gray-800 p-6">
          {cart.map(item => (
            <div key={item.id} className="flex flex-col sm:flex-row justify-between items-center py-4 border-b border-gray-700 last:border-0 gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                <div>
                  <h4 className="font-bold text-white">{item.name}</h4>
                  <p className="text-sm text-gray-400">Precio unidad: {item.price}€</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-gray-900 rounded-lg px-2">
                  <button onClick={() => removeFromCart(item)} className="text-red-500 font-bold p-2">-</button>
                  <span className="text-white w-4 text-center">{item.qty}</span>
                  <button onClick={() => addToCart(item)} className="text-green-500 font-bold p-2">+</button>
                </div>
                <p className="font-bold text-yellow-500 w-20 text-right">{(item.price * item.qty).toFixed(2)}€</p>
              </div>
            </div>
          ))}
          <div className="mt-8 flex flex-col items-end border-t border-gray-700 pt-6">
            <div className="text-3xl font-bold text-white mb-2">Total: <span className="text-gradient">{total.toFixed(2)}€</span></div>
            <p className="text-sm text-gray-400 mb-6">IVA Incluido. Gastos de envío calculados al finalizar.</p>
            <button onClick={checkoutWhatsApp} className="w-full sm:w-auto btn-fuego px-8 py-4 rounded-full text-white font-bold text-lg flex items-center justify-center gap-2">
              <CheckCircle size={20} />
              FINALIZAR PEDIDO EN WHATSAPP
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const Contact = () => (
    <div className="pt-24 pb-12 px-4 max-w-4xl mx-auto min-h-screen">
      <h2 className="text-4xl font-bold mb-12 text-center text-gradient">HABLEMOS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="bg-gray-800 p-3 rounded-full text-yellow-500"><MapPin size={24} /></div>
            <div><h3 className="text-xl font-bold text-white mb-1">Ubicación</h3><p className="text-gray-400">Calle Ejemplo Industrial 23,<br/>Santa Cruz de Tenerife, 38000</p></div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-gray-800 p-3 rounded-full text-green-500"><Phone size={24} /></div>
            <div><h3 className="text-xl font-bold text-white mb-1">WhatsApp / Teléfono</h3><p className="text-gray-400">+34 625 286 488</p></div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-gray-800 p-3 rounded-full text-pink-500"><Instagram size={24} /></div>
            <div><h3 className="text-xl font-bold text-white mb-1">Síguenos</h3><p className="text-gray-400">@dtffuego_tenerife</p></div>
          </div>
        </div>
        <form className="bg-[#222] p-8 rounded-xl border border-gray-800" onSubmit={e => e.preventDefault()}>
          <div className="mb-4"><label className="block text-gray-400 mb-2 text-sm">Nombre</label><input type="text" className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-yellow-500" placeholder="Tu nombre" /></div>
          <div className="mb-4"><label className="block text-gray-400 mb-2 text-sm">Email</label><input type="email" className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-yellow-500" placeholder="tu@email.com" /></div>
          <div className="mb-6"><label className="block text-gray-400 mb-2 text-sm">Mensaje</label><textarea className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white h-32 focus:outline-none focus:border-yellow-500" placeholder="¿En qué podemos ayudarte?"></textarea></div>
          <button className="w-full btn-fuego py-3 rounded font-bold text-white uppercase tracking-wider">Enviar Mensaje</button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col">
      <Nav />
      <main className="flex-grow pt-20">
        {view === 'home' && <Home />}
        {view === 'catalog' && <Catalog />}
        {view === 'cart' && <Cart />}
        {view === 'contact' && <Contact />}
      </main>
      <footer className="bg-black py-8 mt-auto border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Zap className="text-yellow-500" size={20} />
            <span className="font-brand text-xl text-white">DTF FUEGO</span>
          </div>
          <p className="text-gray-500 text-sm">© 2025 DTF Fuego Tenerife. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);

