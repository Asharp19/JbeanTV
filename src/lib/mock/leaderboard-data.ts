// Create static IDs for consistent seeding
const createStaticId = (index: number) => 
  `65f${index.toString().padStart(2, '0')}0000000000000000000${index}`;

export const mockPredictions = [
  {
    _id: createStaticId(1),
    user_id: "67cf4daa031e3987d7c9c590",
    walletAddress: "0x8F3Cf7ad23Cd3CadBD9735AFf958023239c6A063",
    walletType: "trustwallet",
    pair: "ETHUSD",
    predictedPrice: 4200,
    predictedAt: "2024-03-10T00:00:00Z",
    targetDate: "2024-03-25T00:00:00Z"
  },
  {
    _id: createStaticId(2),
    user_id: "67cf4daa031e3987d7c9c591",
    walletAddress: "5KjdMQjFEe2Gb8SHx6cFhKzZHGkXjKPTxEJzFS9NKoJm",
    walletType: "phantom",
    pair: "SOLUSD",
    predictedPrice: 185,
    predictedAt: "2024-03-10T00:00:00Z",
    targetDate: "2024-03-22T00:00:00Z"
  },
  {
    _id: createStaticId(3),
    user_id: "67cf4daa031e3987d7c9c592",
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    walletType: "metamask",
    pair: "BTCUSD",
    predictedPrice: 98500,
    predictedAt: "2024-03-11T00:00:00Z",
    targetDate: "2024-03-24T00:00:00Z"
  },
  {
    _id: createStaticId(4),
    user_id: "67cf4daa031e3987d7c9c593",
    walletAddress: "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE",
    walletType: "ledger",
    pair: "BTCUSD",
    predictedPrice: 97200,
    predictedAt: "2024-03-12T00:00:00Z",
    targetDate: "2024-03-26T00:00:00Z"
  },
  {
    _id: createStaticId(5),
    user_id: "67cf4daa031e3987d7c9c594",
    walletAddress: "0x85f15ddd1B54E9cCE9Cc0Da1Fcfc74A5fC0aE3F3",
    walletType: "trezor",
    pair: "ETHUSD",
    predictedPrice: 5100,
    predictedAt: "2024-03-09T00:00:00Z",
    targetDate: "2024-03-23T00:00:00Z"
  },
  {
    _id: createStaticId(6),
    user_id: "67cf4daa031e3987d7c9c595",
    walletAddress: "3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5",
    walletType: "trustwallet",
    pair: "SOLUSD",
    predictedPrice: 195,
    predictedAt: "2024-03-08T00:00:00Z",
    targetDate: "2024-03-21T00:00:00Z"
  },
  {
    _id: createStaticId(7),
    user_id: "67cf4daa031e3987d7c9c596",
    walletAddress: "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326",
    walletType: "metamask",
    pair: "AVAXUSD",
    predictedPrice: 42,
    predictedAt: "2024-03-10T00:00:00Z",
    targetDate: "2024-03-25T00:00:00Z"
  },
  {
    _id: createStaticId(8),
    user_id: "67cf4daa031e3987d7c9c597",
    walletAddress: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
    walletType: "ledger",
    pair: "BNBUSD",
    predictedPrice: 580,
    predictedAt: "2024-03-11T00:00:00Z",
    targetDate: "2024-03-24T00:00:00Z"
  },
  {
    _id: createStaticId(9),
    user_id: "67cf4daa031e3987d7c9c598",
    walletAddress: "rLW9gnQo7BQhU6igk5keqYnH3TVrCxGRzm",
    walletType: "trustwallet",
    pair: "XRPUSD",
    predictedPrice: 0.65,
    predictedAt: "2024-03-12T00:00:00Z",
    targetDate: "2024-03-26T00:00:00Z"
  },
  {
    _id: createStaticId(10),
    user_id: "67cf4daa031e3987d7c9c599",
    walletAddress: "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
    walletType: "phantom",
    pair: "BTCUSD",
    predictedPrice: 96800,
    predictedAt: "2024-03-09T00:00:00Z",
    targetDate: "2024-03-23T00:00:00Z"
  }
]; 