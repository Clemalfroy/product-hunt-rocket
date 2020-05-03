module.exports = `query SearchPostsItems($after: String, $featured: Boolean, $includeNoLongerAvailable: Boolean, $postedBy: String, $postedDate: String, $query: String, $topicName: [String!]) {
    search_posts(after: $after, featured: $featured, first: 10, includeNoLongerAvailable: $includeNoLongerAvailable, postedBy: $postedBy, postedDate: $postedDate, query: $query, topicNames: $topicName) {
      edges {
        node {
          id
          ...PostItemList
          __typename
      }
      __typename
    }
    topic_facets {
        topic {
          id
          name
          __typename
      }
      count
      __typename
    }
    pageInfo {
        endCursor
        hasNextPage
        __typename
    }
    __typename
  }
}
fragment PostItemList on Post {
    id
    ...PostItem
    __typename
}
fragment PostItem on Post {
    id
    _id
    comments_count
    name
    shortened_url
    slug
    tagline
    updated_at
    ...PostVoteButton
    ...TopicFollowButtonList
    __typename
}
fragment PostVoteButton on Post {
    _id
    id
    featured_at
    updated_at
    disabled_when_scheduled
    has_voted
    ... on Votable {
      id
      votes_count
      __typename
  }
  __typename
}
fragment TopicFollowButtonList on Topicable {
    id
    topics {
      edges {
        node {
          id
          ...TopicFollowButton
          __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment TopicFollowButton on Topic {
    id
    slug
    name
    isFollowed
    __typename
}
`;
