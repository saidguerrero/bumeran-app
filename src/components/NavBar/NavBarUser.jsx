export const NavBarUser = ({ name }) => {
  return (
    <div className="flex justify-center items-center w-8 h-8 rounded-full bg-certus-brand-violet text-white text-sm font-semibold uppercase mr-1 md:mr-0 md:w-10 md:h-10">
      {name}
    </div>
  )
}
