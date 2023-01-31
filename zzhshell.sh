restart-test-env.sh
./presto-benchmark-driver --server http://localhost:8090  --debug --catalog hive --runs 4 --warm 0 --suite-config suite03.json
restart-test-env.sh
./presto-benchmark-driver --server http://localhost:8090  --debug --catalog hive --runs 4 --warm 0 --suite-config suite07.json
restart-test-env.sh
./presto-benchmark-driver --server http://localhost:8090  --debug --catalog hive --runs 4 --warm 0 --suite-config suite19.json
restart-test-env.sh
./presto-benchmark-driver --server http://localhost:8090  --debug --catalog hive --runs 4 --warm 0 --suite-config suite27.json
restart-test-env.sh
./presto-benchmark-driver --server http://localhost:8090  --debug --catalog hive --runs 4 --warm 0 --suite-config suite34.json
