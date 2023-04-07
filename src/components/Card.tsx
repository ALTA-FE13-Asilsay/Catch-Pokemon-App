import { FC } from "react";
import { Link } from "react-router-dom";

interface Props {
  image: string;
  name: string;
  url?: string;
}

const Card: FC<Props> = (props) => {
  const { name, url, image } = props;

  return (
    <Link
      className="font-semibold tracking-wide text-slate-900 dark:text-slate-200"
      to={`detailed/${name}`}
      id="nav-profile"
    >
      <div className="flex flex-col items-center border-2 border-slate-50 dark:border-slate-600 rounded-lg p-2">
        <img
          src={image}
          alt={`${name}'s picture`}
          className="rounded-full w-32 aspect-square mb-3"
        />
        {name}
      </div>
    </Link>
  );
};

export default Card;
