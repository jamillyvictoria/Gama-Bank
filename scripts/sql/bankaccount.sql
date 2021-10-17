  CREATE TABLE bankAccount (
    cc INT(7) AUTO_INCREMENT PRIMARY KEY,
    userId int,
    balance DOUBLE,
    creditBalanceAvailable DOUBLE,
    maxCredit DOUBLE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
    );