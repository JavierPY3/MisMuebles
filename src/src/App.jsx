import './App.css'
import { useState } from 'react'

const productos = [
	{
		id: 1,
		nombre: 'Juegos de sillas',
		descripcion: '6 sillas solas de comedor  reforzadas.',
		precio: '$199.000',
		imagenes: [
			'/juegos-sillas-1.jpg.jpg',
			'/juegos-sillas-2.jpg.jpg',
			'/juegos-sillas-3.jpg.jpg',
			'/juegos-sillas-4.jpg.jpg',
			'/juegos-sillas-5.jpg.jpg',
			'/juegos-sillas-6.jpg.jpg',
			'/juegos-sillas-7.jpg.jpg',
			'/juegos-sillas-8.jpg.jpg',
			'/juegos-sillas-9.jpg.jpg',
			'/juegos-sillas-10.jpg.jpg',
		],
		whatsapp: '5491124762264',
	},
	{
		id: 2,
		nombre: 'Juego de sillas+mesa',
		descripcion: '6 sillas reforzadas + mesa de comedor reforzada.',
		precio: '$285.000',
		imagenes: [
			'/sillas-mesa-1.jpg.jpg',
			'/sillas-mesa-2.jpg.jpg',
			'/sillas-mesa-3.jpg.jpg',
			'/sillas-mesa-4.jpg.jpg',
			'/sillas-mesa-5.jpg.jpg',
			'/sillas-mesa-6.jpg.jpg',
			'/sillas-mesa-7.jpg.jpg',
			'/sillas-mesa-8.jpg.jpg',
			'/sillas-mesa-9.jpg.jpg',
			'/sillas-mesa-10.jpg.jpg',
			'/sillas-mesa-11.jpg.jpg',
		],
		whatsapp: '5491124762264',
	},
	{
		id: 3,
		nombre: 'Sillones',
		descripcion: 'Sillones para todo uso reforzado.',
		precio: '$199.000',
		imagenes: [
			'/sillones-1.jpg.jpg',
			'/sillones-2.jpg.jpg',
			'/sillones-3.jpg.jpg',
			'/sillones-4.jpg.jpg',
			'/sillones-5.jpg.jpg',
			'/sillones-6.jpg.jpg',
			'/sillones-7.jpg.jpg',
			'/sillones-8.jpg.jpg',
			'/sillones-9.jpg.jpg',
		],
		whatsapp: '5491124762264',
	},
]

function App() {
	const [fotoActual, setFotoActual] = useState({})
	const [modal, setModal] = useState({ open: false, img: '', alt: '' })

	const handlePrev = (productoId, total) => {
		setFotoActual((prev) => ({
			...prev,
			[productoId]: prev[productoId] > 0 ? prev[productoId] - 1 : total - 1,
		}))
	}

	const handleNext = (productoId, total) => {
		setFotoActual((prev) => ({
			...prev,
			[productoId]: prev[productoId] < total - 1 ? prev[productoId] + 1 : 0,
		}))
	}

	const handleVerDetalle = (img, alt) => {
		setModal({ open: true, img, alt })
	}

	const handleCerrarModal = () => {
		setModal({ open: false, img: '', alt: '' })
	}

	return (
		<div className="contenedor-principal">
			{modal.open && (
				<div className="modal-overlay" onClick={handleCerrarModal}>
					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						<img src={modal.img} alt={modal.alt} className="modal-img" />
						<button
							className="modal-close"
							onClick={handleCerrarModal}
							aria-label="Cerrar"
						>
							&times;
						</button>
					</div>
				</div>
			)}
			<div className="banner-inicio">
				<h2>Bienvenido a Mis Muebles</h2>
				<p>
					Encuentra los mejores muebles para tu hogar, con atención personalizada y
					entrega rápida.
				</p>
				<a href="#productos" className="banner-btn">
					Ver productos
				</a>
			</div>
			<div className="logo-header">
				<img src="/logo.pnj.jpg" alt="Logo mismuebles" className="logo-img" />
			</div>
			<h1 id="productos">Mis Muebles</h1>
			<p className="subtitulo">
				¡Compra fácil y rápido! Haz clic en el producto para concretar tu compra
				por WhatsApp.
			</p>
			<div className="productos-grid">
				{productos.map((producto) => {
					const idx = fotoActual[producto.id] || 0
					const total = producto.imagenes.length
					return (
						<div className="producto-card" key={producto.id}>
							<div className="carousel-container">
								<button
									className="carousel-btn left"
									onClick={() => handlePrev(producto.id, total)}
									aria-label="Anterior"
								>
									&#8592;
								</button>
								<div className="producto-img-wrapper">
									<img
										src={producto.imagenes[idx]}
										alt={producto.nombre + ' ' + (idx + 1)}
										className="producto-img"
										style={{ cursor: 'zoom-in' }}
										onClick={() =>
											handleVerDetalle(
												producto.imagenes[idx],
												producto.nombre + ' ' + (idx + 1)
											)
										}
									/>
								</div>
								<button
									className="carousel-btn right"
									onClick={() => handleNext(producto.id, total)}
									aria-label="Siguiente"
								>
									&#8594;
								</button>
							</div>
							<div className="carousel-indicator">
								{idx + 1} / {total}
							</div>
							<button
								className="ver-detalle-btn"
								onClick={() =>
									handleVerDetalle(
										producto.imagenes[idx],
										producto.nombre + ' ' + (idx + 1)
									)
								}
							>
								Ver en detalle
							</button>
							<h2>{producto.nombre}</h2>
							<p>{producto.descripcion}</p>
							<span className="precio">{producto.precio}</span>
							<p className="info-pago">
								Por métodos de pago y cuotas, realice la consulta por WhatsApp.
							</p>
							<a
								className="btn-whatsapp"
								href={`https://wa.me/${producto.whatsapp}?text=Hola!%20Quiero%20comprar%20el%20producto:%20${encodeURIComponent(
									producto.nombre
								)}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								Consultar por WhatsApp
							</a>
						</div>
					)
				})}
			</div>
			<div className="info-extra">
				<div className="info-item">
					<span className="info-icon" role="img" aria-label="Envíos">
						🚚
					</span>
					<h3>Envíos accesibles</h3>
					<p>
						Tarifas económicas y entregas rápidas.<br />
						<span style={{ fontSize: '0.97em', color: '#6b7280' }}>Sujeto a tarifas de envío según ubicación.</span>
					</p>
				</div>
				<div className="info-item">
					<span className="info-icon" role="img" aria-label="Pagos">
						💳
					</span>
					<h3>Facilidad de pago</h3>
					<p>Aceptamos métodos de pago (Efectivo - Transferencia) y posibilidad de pagos en cuotas.</p>
				</div>
				<div className="info-item">
					<span className="info-icon" role="img" aria-label="Atención">
						🤝
					</span>
					<h3>Atención personalizada</h3>
					<p>
						Te asesoramos en todo momento para que elijas lo mejor para tu hogar.
					</p>
				</div>
			</div>
			<div className="redes-sociales">
				<a href="https://www.facebook.com/Mismuebles.club/" className="red-social-link" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
					<img src="/facebook-logo.png" alt="Facebook" className="red-social-img" /> Facebook
				</a>
				<a href="https://www.instagram.com/mismuebles.club/" className="red-social-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
					<img src="/instagram-logo.png" alt="Instagram" className="red-social-img" /> Instagram
				</a>
			</div>
			<footer className="footer-derechos">
				&copy; {new Date().getFullYear()} mismuebles.com - Todos los derechos
				reservados
			</footer>
		</div>
	)
}

export default App
