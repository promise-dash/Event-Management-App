namespace server.Models
{
    public class DatabaseSettings: IDatabaseSettings
    {
        public string UserCollectionName { get; set; } = String.Empty;
        public string EventCollectionName { get; set; } = String.Empty;
        public string ConnectionString { get; set; } = String.Empty;
        public string DatabaseName { get; set; } = String.Empty;
    }
}
