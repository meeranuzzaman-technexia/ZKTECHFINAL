// LEGACY SERVICES IMPLEMENTATION
// This file is intentionally fully commented out. Remove the leading `//`
// markers and rename it to Services.jsx to restore the former list layout.
//
// import { useEffect, useRef } from 'react'
// import { gsap } from '../lib/gsap'
// import { splitWords } from '../lib/split'
// import { services, LIVE } from '../data/site'
//
// export default function Services() {
//   const root = useRef(null)
//   const listRef = useRef(null)
//   const preview = useRef(null)
//
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const titleWords = splitWords('.services__title', { wordClass: 'w', innerClass: 'wi' })
//       gsap.fromTo(
//         titleWords,
//         { yPercent: 115 },
//         {
//           yPercent: 0,
//           duration: 1.25,
//           ease: 'zk-expo',
//           stagger: 0.05,
//           scrollTrigger: { trigger: '.services__head', start: 'top 82%' },
//         }
//       )
//
//       gsap.fromTo(
//         '.services__lead',
//         { opacity: 0, y: 26 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 1,
//           ease: 'zk-expo',
//           scrollTrigger: { trigger: '.services__head', start: 'top 78%' },
//         }
//       )
//
//       gsap.utils.toArray('.svc').forEach((row, i) => {
//         const titleInner = row.querySelector('.svc__title-inner')
//         gsap.fromTo(
//           titleInner,
//           { yPercent: 112 },
//           {
//             yPercent: 0,
//             duration: 1.1,
//             ease: 'zk-expo',
//             scrollTrigger: { trigger: row, start: 'top 92%' },
//           }
//         )
//         gsap.fromTo(
//           row.querySelectorAll('.svc__index, .svc__desc, .svc__arrow'),
//           { opacity: 0, y: 18 },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.9,
//             ease: 'zk-expo',
//             stagger: 0.06,
//             delay: i * 0.02,
//             scrollTrigger: { trigger: row, start: 'top 94%' },
//           }
//         )
//         gsap.fromTo(
//           row,
//           { '--line': 0 },
//           {
//             '--line': 1,
//             duration: 1.1,
//             ease: 'zk-expo',
//             scrollTrigger: { trigger: row, start: 'top 96%' },
//           }
//         )
//       })
//     }, root)
//
//     return () => ctx.revert()
//   }, [])
//
//   useEffect(() => {
//     const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
//     const list = listRef.current
//     const box = preview.current
//     if (!fine || !list || !box) return
//
//     const xTo = gsap.quickTo(box, 'x', { duration: 0.7, ease: 'power3.out' })
//     const yTo = gsap.quickTo(box, 'y', { duration: 0.5, ease: 'power3.out' })
//
//     const onMove = (event) => {
//       const rect = list.getBoundingClientRect()
//       xTo(event.clientX - rect.left)
//       yTo(event.clientY - rect.top)
//     }
//     list.addEventListener('mousemove', onMove)
//
//     const rows = Array.from(list.querySelectorAll('.svc'))
//     const enter = (row, index) => () => {
//       box.classList.add('is-on')
//       box.querySelectorAll('img').forEach((img, imageIndex) => {
//         img.classList.toggle('is-active', imageIndex === index)
//       })
//     }
//     const leave = () => box.classList.remove('is-on')
//
//     rows.forEach((row, index) => {
//       row.addEventListener('mouseenter', enter(row, index))
//       row.addEventListener('mouseleave', leave)
//     })
//
//     return () => {
//       list.removeEventListener('mousemove', onMove)
//       rows.forEach((row, index) => {
//         row.removeEventListener('mouseenter', enter(row, index))
//         row.removeEventListener('mouseleave', leave)
//       })
//     }
//   }, [])
//
//   return (
//     <section className="section services" id="services" ref={root}>
//       <div className="shell">
//         <div className="services__head">
//           <h2 className="services__title display h2">
//             Everything a growing brand needs, under one roof
//           </h2>
//           <p className="services__lead lead">
//             One team for the website, the app, the brand and the growth engine behind them — so nothing
//             gets lost between vendors. Hover a service to preview the work.
//           </p>
//         </div>
//
//         <div className="services__list" ref={listRef}>
//           {services.map((service) => (
//             <a
//               className="svc"
//               key={service.index}
//               href={service.href}
//               target="_blank"
//               rel="noreferrer"
//               data-cursor="open"
//             >
//               <span className="svc__index">{service.index}</span>
//               <h3 className="svc__title">
//                 <span className="w">
//                   <span className="svc__title-inner wi">{service.title}</span>
//                 </span>
//               </h3>
//               <p className="svc__desc">{service.desc}</p>
//               <span className="svc__arrow" aria-hidden="true">
//                 <Arrow />
//               </span>
//             </a>
//           ))}
//
//           <div className="svc-preview" ref={preview} aria-hidden="true">
//             {services.map((service) => (
//               <img key={service.index} src={service.image} alt="" loading="lazy" />
//             ))}
//           </div>
//         </div>
//
//         <p className="services__foot mono dim" style={{ marginTop: '2rem' }}>
//           Need something custom?{' '}
//           <a className="tlink" href={`${LIVE}/pages/services.php`} target="_blank" rel="noreferrer">
//             See all services →
//           </a>
//         </p>
//       </div>
//     </section>
//   )
// }
//
// function Arrow() {
//   return (
//     <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
//       <path
//         d="M7 17 17 7m0 0H8.5M17 7v8.5"
//         stroke="currentColor"
//         strokeWidth="1.7"
//         strokeLinecap="round"
//       />
//     </svg>
//   )
// }
