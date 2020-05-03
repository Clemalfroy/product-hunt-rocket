module.exports = `query VotersPage($id: ID!, $first: Int!, $cursor: String) {
    node(id: $id) {
      ... on Votable {
        voters(first: $first, after: $cursor) {
          edges {
            node {
              id
              ...PeoplePopoverContent
              __typename
          }
          __typename
        }
        pageInfo {
            hasNextPage
            startCursor
            endCursor
            __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}
fragment PeoplePopoverContent on User {
    _id
    id
    name
    username
    twitter_username
    headline
    is_trashed
    __typename
}
`;
