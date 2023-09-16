export default function formatGroup(array) {
  const groupedData = array.reduce((groups, item) => {
    const { createdAt } = item;
    if (!groups[createdAt]) {
      groups[createdAt] = [];
    }
    groups[createdAt].push(item);
    return groups;
  }, {});

  return groupedData;
}
