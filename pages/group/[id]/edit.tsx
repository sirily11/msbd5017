import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { GetServerSideProps, NextPage } from "next";
import GroupForm from "../../../components/Group/GroupForm";
import { NetworkService } from "../../../services/NetworkService";
import { Group } from "../../../services/NetworkServiceInterface";

interface Props {
  group: Group;
}

const Index: NextPage<Props> = (props: Props) => {
  return <GroupForm group={props.group} />;
};

export default Index;

export const getServerSideProps: GetServerSideProps<Props> = withPageAuth({
  redirectTo: "/signIn",
  async getServerSideProps(context) {
    const service = new NetworkService();
    const group = await service.getGroupById(
      parseInt(context.params!.id! as string)
    );

    if (group.error) {
      console.log(group.error);
      return {
        notFound: true,
      };
    }

    return {
      props: {
        group: group.data,
      },
    };
  },
});
