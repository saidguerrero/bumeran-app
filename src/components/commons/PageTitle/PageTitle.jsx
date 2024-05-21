export default function PageTitle({ title = '', className = '' }) {
  return (
    <div
      className={`relative pl-5 before:absolute before:bg-certus-brand-pink before:left-0 before:h-full before:w-3 before:top-0 before:rounded-b-lg ${className}`}
    >
      <h1 className="font-oooh-baby text-4xl text-certus-brand-violet md:text-5xl xl:text-7xl">
        {title}
      </h1>
    </div>
  )
}
