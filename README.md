# alarms

Fetch alarms from the last 24 hours

## Installation

```bash
npm install -g @metasys/alarms
```

## Usage

You can fetch alarms from a metasys server.

```bash
$ alarms -u joesmith -h adx-server
Password: ************
...............................................................................
.........................................
```

## Command Line Options

```text
  -u, --username    The username of the account to login as
  -p, --password    The password of the account to login as
  -h, --host        The server to login into
  -f                The name of a file that contains the username,
                    password, and host information
```

Assuming you have a file named credentials.json that looks like this

```json
{
  'username': 'joesmith',
  'password': 'zjds83jsldja',
  'host': 'my-adx'
}
```

You can invoke the program like this:

```shell
alarms -f credentials.json
```



## Output

The alarms that are fetched are stored to the `output/` directory where you ran the program.