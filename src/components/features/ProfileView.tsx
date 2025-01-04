import { useGetProfileInformationQuery } from "../../gql/graphql";
import { formatDate } from "../../libs/utils";

const ProfileView = () => {
  const { data } = useGetProfileInformationQuery();
  console.log(data);

  return (
    <article className="flex h-auto w-full flex-col items-center gap-4 rounded-lg bg-color_neutral_4 p-4 text-white">
      <div className="flex w-full items-center justify-between">
        <img
          alt={data?.profile.fullName}
          className="w-10 rounded-full"
          src={
            data?.profile.avatar ||
            "https://eu.ui-avatars.com/api/?name=HenryAgustin&size=250"
          }
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <h3 className="py-[2.5px] text-display-xS font-bold">
          Name: {data?.profile.fullName}
        </h3>
        <h4 className="text-body-xL font-bold">Email: {data?.profile.email}</h4>
        <h4 className="text-body-xL font-bold">Type: {data?.profile.type}</h4>
        <h4 className="text-body-xL font-bold">
          Created at: {formatDate(data?.profile.createdAt)}
        </h4>
        <h4 className="text-body-xL font-bold">
          Updated at: {formatDate(data?.profile.updatedAt)}
        </h4>
      </div>
    </article>
  );
};

export default ProfileView;
