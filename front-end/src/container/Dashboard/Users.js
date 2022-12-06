import ErrorMsg from "components/UI/ErrorMsg";
import Loader from "components/UI/Loader";
import User from "components/Users/User";
import { Col, Row } from "reactstrap";
import { useGetUsersQuery } from "store/api/userApiSlice";

const Users = () => {
  const { isLoading, data: users, isError } = useGetUsersQuery();
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return (
      <ErrorMsg msg="Failed while getting users or you don't have permission!" />
    );
  }
  return (
    users && (
      <>
            <h5 className="text-center mx-auto w-50 shadow bg-primary text-light rounded-pill py-2 px-1">All Uses <i className="fa fa-users ms-2"></i></h5>
        <Row className="g-2">
            {users.map((user) => (
            <Col key={user._id} md={6} lg={4}>
                <User  user={user} />
            </Col>
            ))}
        </Row>
      </>
    )
  );
};

export default Users;
