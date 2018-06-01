#  Dev Guide
```sh
$ bower install
$ npm install
```
Scss linting has a dependency of a `ruby gem`. You should have `Ruby` installed on your system.


```sh
$ gem install scss_lint
```
 
To remove scss linting, simply remove `scss-lint` from gulp run sequence. 

```sh
...
runSequence(['copy:all','css', 'scss-lint', 'js', 'markup'],
...
```
