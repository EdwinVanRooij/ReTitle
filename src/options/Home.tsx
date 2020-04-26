import { h } from 'preact';

import Footer from './Footer';

const Home = () => {
  return (
    <div id="container" class="card">
      <main>
        <div class="row">
          <div class="col s12">
            <ul class="tabs">
              <li class="tab col s4 center-align">
                <a href="#savedTitles">Saved Titles</a>
              </li>
              <li class="tab col s4 center-align">
                <a href="#defaultOptions">Options</a>
              </li>
              <li class="tab col s4 center-align">
                <a href="#advancedOptions">Advanced</a>
              </li>
            </ul>
          </div>
          <div id="savedTitles" class="col s12">
            <ul class="description">
              <li>
                Click the title
                <img src="./images/pencil.svg" style="height: 10px;" /> to edit
                it
              </li>
              <li>
                Click the red trash can icon to delete the URL-to-title mapping
              </li>
              <li>
                URLs like <code>*example.com*</code> are set for the domain.
              </li>
              <li>
                Use <code>$0</code> to insert the original title. So if you want
                <code>Title</code> to say <code>Good Title</code>, set the title
                name to <code>Good $0</code>.
              </li>
            </ul>
            <ul class="collection"></ul>
          </div>
          <div id="defaultOptions" class="col s12">
            <p>
              This setting will be used as a default value in the extension pop
              up menu. These options are in the order of priority, so for
              example <code>Set for this tab</code> will be matched instead of
              <code>Only exact match</code> if the given tab matches both.
            </p>
            <form class="col s12" id="form">
              <p>
                <label for="onetime">
                  <input
                    class="with-gap"
                    name="option"
                    type="radio"
                    id="onetime"
                  />
                  <span>
                    <strong>Only this time</strong>: Temporarily sets the title,
                    so it's not persistent at all. Reloading or changing the URL
                    loses this change.
                  </span>
                </label>
              </p>
              <p>
                <label for="tablock">
                  <input
                    class="with-gap"
                    name="option"
                    type="radio"
                    id="tablock"
                  />
                  <span>
                    <strong>Set for this tab</strong>: This will match the
                    current tab no matter the URL, but will be lost once the tab
                    is closed. Note that if your browser is restarted, this will
                    be lost.
                  </span>
                </label>
              </p>
              <p>
                <label for="exact">
                  <input
                    class="with-gap"
                    name="option"
                    type="radio"
                    id="exact"
                  />
                  <span>
                    <strong>Only exact match</strong>: This will match the URL
                    and it will be persistent across sessions.
                  </span>
                </label>
              </p>
              <p>
                <label for="domain">
                  <input
                    class="with-gap"
                    name="option"
                    type="radio"
                    id="domain"
                  />
                  <span>
                    <strong>Set for this domain</strong>: This will match the
                    domain part of the URL and it will be persistent across
                    sessions.
                  </span>
                </label>
              </p>
              <div class="btn" id="save" type="submit">
                SAVE
                <i class="material-icons" id="check">
                  check
                </i>
              </div>
            </form>
          </div>
          <div id="advancedOptions" class="col s12">
            <ul class="collapsible">
              <li>
                <div class="collapsible-header">Keyboard Shortcut</div>
                <div class="collapsible-body">
                  <span>
                    Keyboard Shortcut: "Alt+Shift+X"
                    <br />
                    <h2>
                      Edit Keyboard Shortcuts
                      <i class="material-icons" id="keyboard">
                        keyboard
                      </i>
                    </h2>
                  </span>
                </div>
              </li>
              <li>
                <div class="collapsible-header">
                  Beta Feature: Regex Replacement
                </div>
                <div class="collapsible-body">
                  <span>
                    <h6>This feature may not work as expected!</h6>
                    <br />
                    There's a beta feature that lets you replace titles using
                    regex. If you do not know what regex is, I don't recommend
                    using this feature.
                    <br />
                    The syntax is <br />
                    <code>/regex/replacement/flags</code>
                    <br />
                    Notice that there are three forward slashes, so if you want
                    to use a slash in regex or replacement, you need to escape
                    it with a backward slash <code>\</code>.<br />
                    In replacement, you can use regex's captured groups with
                    <code>$1</code>, <code>$2</code> and so on.
                    <br />
                    Possible flags are "g" for global, and "i" for ignore case.
                    Do not forget the last slash if not using any flags.
                    <br />
                    Examples:
                    <br />
                    <code>/.*/Lazy/</code> is the same as just setting the title
                    to "Lazy".
                    <br />
                    <code>/(.*)/LAZ $1/</code> will replace "old title" to "LAZ
                    old title".
                    <br />
                    <code>/(.*)/r\/$1/</code> will replace "Lazy" to "r/Lazy".
                    <br />
                    <code>/([a-z])/0$1/gi</code> will replace "sPonGe" to
                    "0s0P0o0n0G0e"
                    <br />
                    <code>/f([^o]+)(.*)/FB $2$1/i</code> will replace "Facebook"
                    to "FB ookaceb" (but why)
                  </span>
                </div>
              </li>
              <li>
                <div class="collapsible-header">
                  Beta Feature: Add Your Own URL Pattern
                </div>
                <div class="collapsible-body">
                  <span>
                    <h6>This feature may not work as expected!</h6>
                    <br />
                    Another beta feature that lets you create your own URL
                    pattern match.
                    <br />
                    Note that regex matching has the lowest priority when
                    searching for a URL match.
                    <br />
                    The URL pattern must start and end with an asterisk
                    <code>*</code>
                    <br />
                    Instead of using $1, $2 to use capture groups, use ${1}, $
                    {2} instead for URLs.
                    <br />
                    Examples: <br />
                    <code>*reddit\.com/(r/[^/]+)* | Red ${1}</code> will change
                    <code>https://www.reddit.com/r/funny</code> to
                    <code>Red r/funny</code> It can be combined with the title
                    regex mentioned above too.
                    <br />
                    <code>
                      *\.([^.]+)\.com/(.*)* | /(.*)/${1} $1 ${2}/
                    </code>
                    will change <code>https://www.reddit.com/r/funny</code> to
                    <code>reddit funny r/funny</code> <br />
                    <br />
                    <div class="row">
                      <form class="col s12">
                        <div class="row">
                          <div class="input-field col s6">
                            <textarea
                              id="urlPattern"
                              class="materialize-textarea"
                            ></textarea>
                            <label for="urlPattern">URL Pattern</label>
                            <span
                              class="helper-text"
                              data-error="Invalid: Must start and end with a *"
                            ></span>
                          </div>
                          <div class="input-field col s6">
                            <textarea
                              id="newTitle"
                              class="materialize-textarea"
                            ></textarea>
                            <label for="newTitle">New Title</label>
                          </div>
                        </div>
                        <div class="btn" id="add" type="submit">
                          Add Patterns
                          <i class="material-icons" id="added">
                            check
                          </i>
                        </div>
                      </form>
                    </div>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
