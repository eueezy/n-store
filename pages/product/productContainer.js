import { withRouter } from "next/router";
import ProductPresenter from "./productPresenter";
import { Query } from "react-apollo";
import { PRODUCT_QUERY } from "./productQueries";

class ProductContainer extends React.Component {
  static async getInitialProps(props) {
    const {
      query: { id }
    } = props;
    return {
      id
    };
  }
  render() {
    console.log(this.props.id);
    const { id } = this.props;
    return (
      <Query query={PRODUCT_QUERY} variables={{ id }}>
        {({ data }) => <ProductPresenter data={data} />}
      </Query>
    );
  }
}

export default withRouter(ProductContainer);
