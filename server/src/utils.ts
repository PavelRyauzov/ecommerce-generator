export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export const getConnectionOutputForClient = <T>(
  arr: Array<T>,
): Connection<T> => {
  const edges = arr.map((item) => {
    return {
      node: {
        ...item,
      },
    };
  });

  const connection = {
    edges: edges,
  };

  return connection;
};
