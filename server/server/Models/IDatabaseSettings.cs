﻿namespace server.Models
{
    public interface IDatabaseSettings
    {
        string UserCollectionName { get; set; }
        string EventCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
