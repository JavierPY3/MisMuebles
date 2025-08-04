import './App.css'
import React, { useState } from 'react'

const productos = [
	{
		id: 1,
		nombre: 'Juegos de sillas',
		descripcion: '6 sillas solas de comedor reforzadas.',
		precio: '$235.000',
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
		precio: '$260.000',
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
		precio: '$230.000',
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
	const [modal, setModal] = useState({ open: false, img: '', alt: '', productoId: null, currentIndex: 0 })

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

	const handleVerDetalle = (img, alt, productoId = null, currentIndex = 0) => {
		setModal({ open: true, img, alt, productoId, currentIndex })
		// Agregar entrada al historial para el botón de retroceso
		window.history.pushState({ modalOpen: true }, '', window.location.href)
	}

	const handleCerrarModal = () => {
		setModal({ open: false, img: '', alt: '', productoId: null, currentIndex: 0 })
	}

	const handleModalPrev = () => {
		if (modal.productoId !== null) {
			const producto = productos.find(p => p.id === modal.productoId)
			if (producto) {
				const newIndex = modal.currentIndex > 0 ? modal.currentIndex - 1 : producto.imagenes.length - 1
				const newImg = producto.imagenes[newIndex]
				const newAlt = producto.nombre + ' ' + (newIndex + 1)
				setModal(prev => ({
					...prev,
					img: newImg,
					alt: newAlt,
					currentIndex: newIndex
				}))
			}
		}
	}

	const handleModalNext = () => {
		if (modal.productoId !== null) {
			const producto = productos.find(p => p.id === modal.productoId)
			if (producto) {
				const newIndex = modal.currentIndex < producto.imagenes.length - 1 ? modal.currentIndex + 1 : 0
				const newImg = producto.imagenes[newIndex]
				const newAlt = producto.nombre + ' ' + (newIndex + 1)
				setModal(prev => ({
					...prev,
					img: newImg,
					alt: newAlt,
					currentIndex: newIndex
				}))
			}
		}
	}

	// Manejo del botón de retroceso del navegador
	React.useEffect(() => {
		const handlePopState = (event) => {
			if (modal.open) {
				handleCerrarModal()
				// Prevenir la navegación hacia atrás
				event.preventDefault()
			}
		}

		window.addEventListener('popstate', handlePopState)
		
		return () => {
			window.removeEventListener('popstate', handlePopState)
		}
	}, [modal.open])

	// Manejo de teclas en el modal
	React.useEffect(() => {
		const handleKeyDown = (event) => {
			if (modal.open) {
				switch (event.key) {
					case 'Escape':
						handleCerrarModal()
						break
					case 'ArrowLeft':
						handleModalPrev()
						break
					case 'ArrowRight':
						handleModalNext()
						break
				}
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [modal.open, modal.currentIndex, modal.productoId])

	return (
		<div className="contenedor-principal">
			{modal.open && (
				<div className="modal-overlay" onClick={handleCerrarModal}>
					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						{modal.productoId !== null && (
							<button
								className="modal-nav-btn modal-nav-prev"
								onClick={handleModalPrev}
								aria-label="Imagen anterior"
							>
								&#8592;
							</button>
						)}
						<img src={modal.img} alt={modal.alt} className="modal-img" />
						{modal.productoId !== null && (
							<button
								className="modal-nav-btn modal-nav-next"
								onClick={handleModalNext}
								aria-label="Imagen siguiente"
							>
								&#8594;
							</button>
						)}
						{modal.productoId !== null && (
							<div className="modal-indicator">
								{modal.currentIndex + 1} / {productos.find(p => p.id === modal.productoId)?.imagenes.length || 1}
							</div>
						)}
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
			
			<div className="servicios-section">
				<div className="servicio-card">
					<div className="servicio-icon">🚚</div>
					<h3>Envíos accesibles</h3>
					<p>Tarifas económicas y entregas rápidas.</p>
					<span className="servicio-nota">Sujeto a tarifas de envío según ubicación.</span>
				</div>
				<div className="servicio-card">
					<div className="servicio-icon">💳</div>
					<h3>Facilidad de pago</h3>
					<p>Aceptamos métodos de pago (Efectivo - Transferencia) y posibilidad de pagos en cuotas.</p>
				</div>
				<div className="servicio-card">
					<div className="servicio-icon">🤝</div>
					<h3>Atención personalizada</h3>
					<p>Te asesoramos en todo momento para que elijas lo mejor para tu hogar.</p>
				</div>
			</div>
			
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
												producto.nombre + ' ' + (idx + 1),
												producto.id,
												idx
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
										producto.nombre + ' ' + (idx + 1),
										producto.id,
										idx
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
			
			<div className="redes-sociales-section">
				<h3>Síguenos en nuestras redes sociales</h3>
				<div className="redes-sociales-container">
					<a 
						href="https://www.facebook.com/Mismuebles.club" 
						target="_blank" 
						rel="noopener noreferrer"
						className="red-social-link facebook"
						aria-label="Síguenos en Facebook"
					>
						<img src="/facebook-logo.svg" alt="Facebook" className="red-social-icon" />
						<span>Facebook</span>
					</a>
					<a 
						href="https://www.instagram.com/mismueblesclub/" 
						target="_blank" 
						rel="noopener noreferrer"
						className="red-social-link instagram"
						aria-label="Síguenos en Instagram"
					>
						<img src="/instagram-logo.svg" alt="Instagram" className="red-social-icon" />
						<span>Instagram</span>
					</a>
				</div>
			</div>
			
			<footer className="footer-derechos">
				&copy; {new Date().getFullYear()} mismuebles.com - Todos los derechos
				reservados
			</footer>
			
			{/* Botón flotante de WhatsApp */}
			<div className="whatsapp-flotante">
				<a
					href="https://wa.me/5491124762264?text=Hola!%20Quiero%20realizar%20una%20consulta"
					target="_blank"
					rel="noopener noreferrer"
					className="whatsapp-flotante-btn"
					aria-label="Realizar consulta por WhatsApp"
				>
					<div className="whatsapp-icon">
						<img src="/whatsapp-logo.svg" alt="WhatsApp" className="whatsapp-logo" />
					</div>
					<span className="whatsapp-text">Realiza tu consulta aquí</span>
				</a>
			</div>
		</div>
	)
}

export default App
