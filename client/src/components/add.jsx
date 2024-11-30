export default function AddSvg({ className }) {
  return (
    <svg
      className={`${className} relative`}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0"
        y="0"
        width="32"
        height="32"
        className="fill-transparent hover:fill-neutral-200 dark:hover:fill-neutral-800 transition-colors"
      />
      <g id="Complete">
        <g data-name="add" id="add-2">
          <g>
            <line
              className="stroke-black dark:stroke-white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              x1="16"
              x2="16"
              y1="5"
              y2="27"
            />
            <line
              className="stroke-black dark:stroke-white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              x1="5"
              x2="27"
              y1="16"
              y2="16"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
