import React, { Component } from "react";
import { Button, Pagination, Form } from "react-bootstrap";

class TablePaging extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      limit: 5,
      searchKeyword: "",
      sort: true,
      status: true,
      orderby: "id",
    };
  }

  componentDidMount() {
    this.refreshPage();
  }

  refreshPage = () => {
    const { page, limit, searchKeyword, sort, status, orderby } = this.state;
    this.props.handleFetchGetAll(page, limit, searchKeyword, sort, status, orderby);
  };

  render() {
    const { page, limit, searchKeyword, sort, status } = this.state;
    const { isLoading, totalProduct } = this.props;
    return (
      <div>
        <Pagination>
          <Pagination.First
            onClick={() => this.setState({ page: 1 }, this.refreshPage)}
            disabled={page == 1 ? true : false}
          />
          <Pagination.Prev
            disabled={page == 1 ? true : false}
            onClick={() => this.setState({ page: page - 1 }, this.refreshPage)}
          />

          {page <= 2 ? null : (
            <Pagination.Item onClick={() => this.setState({ page: page - 2 }, this.refreshPage)}>
              {page - 2}
            </Pagination.Item>
          )}
          {page <= 1 ? null : (
            <Pagination.Item onClick={() => this.setState({ page: page - 1 }, this.refreshPage)}>
              {page - 1}
            </Pagination.Item>
          )}

          <Pagination.Item active>{page}</Pagination.Item>

          {page + 1 <= Math.ceil(totalProduct / limit) && (
            <Pagination.Item onClick={() => this.setState({ page: page + 1 }, this.refreshPage)}>
              {page + 1}
            </Pagination.Item>
          )}

          {page + 2 <= Math.ceil(totalProduct / limit) && (
            <Pagination.Item onClick={() => this.setState({ page: page + 2 }, this.refreshPage)}>
              {page + 2}
            </Pagination.Item>
          )}

          <Pagination.Next
            onClick={() => this.setState({ page: page + 1 }, this.refreshPage)}
            disabled={page === Math.ceil(totalProduct / limit) ? true : false}
          />
          <Pagination.Last
            onClick={() => this.setState({ page: Math.ceil(totalProduct / limit) }, this.refreshPage)}
            disabled={page === Math.ceil(totalProduct / limit) ? true : false}
          />

          <Pagination.Item onClick={() => this.setState({ sort: !sort }, this.refreshPage)} disabled={isLoading}>
            {sort ? "ASC" : "DESC"}
          </Pagination.Item>
          <Pagination.Item onClick={() => this.setState({ status: !status }, this.refreshPage)} disabled={isLoading}>
            {status ? "Active" : "Not Active"}
          </Pagination.Item>
        </Pagination>
        <input
          type="text"
          placeholder="Search By Name"
          value={searchKeyword}
          onChange={(event) => this.setState({ searchKeyword: event.target.value, page: 1 }, this.refreshPage)}
        />
      </div>
    );
  }
}

export default TablePaging;
