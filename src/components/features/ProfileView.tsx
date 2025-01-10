import { useGetProfileInformationQuery } from "../../gql/graphql";
import { formatDate } from "../../libs/utils";
import ProfileSkeleton from "../ui/loadingSkeletons/ProfileSkeleton";
import LinkIcon from "../../assets/icons/link-icon.svg?react";
import LocationIcon from "../../assets/icons/location-icon.svg?react";
import LinkedinIcon from "../../assets/icons/linkedin-icon.svg?react";
import GithubIcon from "../../assets/icons/github.icon.svg?react";

const ProfileView = () => {
  const { data, loading } = useGetProfileInformationQuery();

  if (loading) return <ProfileSkeleton />;
  return (
    <section className="flex w-full flex-col items-center gap-4">
      <article className="flex h-auto w-full md:w-[400px] flex-col items-center gap-12 rounded-lg bg-color_neutral_4 p-4 text-color_neutral_1">
        <div className="flex w-full h-[107px] items-center justify-center text-center relative text-body-xL font-bold bg-color_neutral_5 rounded-lg">
          <img
            alt={data?.profile.fullName}
            className=" absolute top-12 left-5 w-[86px] rounded-full"
            src={
              data?.profile.avatar ||
              "https://eu.ui-avatars.com/api/?name=HenryAgustin&size=250"
            }
          />
          <p> Design + Code</p>
        </div>
        <div className="flex w-full flex-col gap-3 rounded-lg text-color_neutral_2">
          <h3 className="py-[2.5px] text-display-xS font-bold text-color_neutral_1">
            {data?.profile.fullName}
          </h3>
          <h4 className="text-body-M font-bold">{data?.profile.email}</h4>
          <p className="text-justify">Frontend Developer with React | Building Websites and Webapps with Seamless User Experience Across Devices.</p>
          <p className="text-body-M">Type: {data?.profile.type}</p>
          <p className="text-body-M">
            Created at: {formatDate(data?.profile.createdAt)}
          </p>
          <p className="text-body-M">
            Updated at: {formatDate(data?.profile.updatedAt)}
          </p>
          <p className="flex gap-2 items-center cursor-pointer hover:text-color_primary_4"><LinkIcon width={20} height={20} /> henryagustin.dev</p>
          <p className="flex gap-2 items-center cursor-pointer hover:text-color_primary_4"><LocationIcon width={20} height={20} />El Salvador</p>
          <div className="flex gap-2">
            <a className="hover:text-color_primary_4" href="https://www.linkedin.com/in/henry-agustin-/" target="_blank" rel="noreferrer">
              <LinkedinIcon width={24} height={24} />
            </a>
            <a className="hover:text-color_primary_4" href="https://github.com/lexcode1227" target="_blank" rel="noreferrer">
              <GithubIcon width={24} height={24} />
            </a>
          </div>
        </div>
      </article>
    </section>
  );
};

export default ProfileView;
