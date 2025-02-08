"use client";
import SkillCard from "./SkillCard";
import { gql } from "@/__generated__";
import { useQuery } from "@apollo/client";
import { Button, Spin } from "antd";
import { AiOutlineReload } from "react-icons/ai";

interface Props {
  type: string;
}

const ALL_SKILLS = gql(`
  query Skills_F($pagination: PaginationInput, $query: SkillsQueryInput) {
      skills(pagination: $pagination, query: $query) {
      data { _id name image {url}
      }
    }
  }
`);

const SkillDivision: React.FC<Props> = ({ type }) => {
  const variables = {
    pagination: {
      page: 1,
      limit: 100,
      // sortOrder: sortOrder as InputMaybe<SortOrder>,
      sortBy: "updatedAt",
    },
    query: { type },
  };
  const { loading, data, refetch } = useQuery(ALL_SKILLS, { variables });
  return (
    <Spin spinning={loading}>
      <div className="my-4 pt-4">
        <div className="flex">
          <h3 className="fw-bold heading">
            <span style={{ paddingRight: 7 }}> {type} </span>
            Skills
          </h3>
          {Array.isArray(data?.skills.data?.length) && data?.skills.data?.length > 0 && (
            <Button type="text" className="ml-auto" onClick={() => refetch()}>
              <AiOutlineReload />
            </Button>
          )}
        </div>
        <hr />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array.isArray(data?.skills.data) && data?.skills.data?.length > 0 ? (
          data?.skills.data?.map((d) => <SkillCard key={d._id} data={d} />)
        ) : (
          <p> No Skill Found </p>
        )}
      </div>
    </Spin>
  );
};

export default SkillDivision;
