export default function ExpandingArrow({ className }: { className?: string }) {
  return (
      <div className="group relative flex items-center -mt-2">
          <svg
              className={`${
                  className ? className : "h-4 w-4"
              } absolute transition-all group-hover:translate-y-1`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              width="16"
              height="16"
          >
              <path
                  d="m19 12-7 7-7-7"
              ></path>
          </svg>
          <svg
              className={`${
                  className ? className : "h-4 w-4"
              } absolute opacity-0 transition-all group-hover:translate-y-1 group-hover:opacity-100`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              width="16"
              height="16"
          >
              <path
                  d="M12 5v14"
              ></path>
          </svg>
          {/*<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"*/}
          {/*     stroke="currentColor"*/}
          {/*     className={`${*/}
          {/*         className ? className : 'h-4 w-4'*/}
          {/*     } absolute opacity-0 transition-all group-hover:translate-y-1 group-hover:opacity-100`}>*/}
          {/*    <path d="m19 12-7 7-7-7"/>*/}
          {/*    <path d="M12 5v14"/>*/}
          {/*</svg>*/}
      </div>
  );
}
