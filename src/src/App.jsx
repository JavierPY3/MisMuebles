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
		nombre: 'Juedo de sillas+mesa',
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
		nombre: 'sillones',
		descripcion: 'Sillones para todo uso reforzado.',
		precio: '$199.000',
		imagenes: [
			'/Sillones-1.jpg.jpg',
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
			<div className="logo-header">
				<img src="/logo.pnj.jpg" alt="Logo mismuebles" className="logo-img" />
			</div>
			<h1>Mis Muebles</h1>
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
			<footer className="footer-derechos">
				&copy; {new Date().getFullYear()} mismuebles.com - Todos los derechos
				reservados
			</footer>
		</div>
	)
}

export default App
