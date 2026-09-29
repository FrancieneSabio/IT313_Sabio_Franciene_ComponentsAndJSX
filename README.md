# Student Roster Card Renderer — IT313 Lab 4

## The Problem

Render each currently enrolled student as a reusable card, using
component-based architecture, props, JSX expressions, conditional
rendering, and list rendering with a stable `key`.

## Component Structure

- **`StudentCard.js`** — a small, reusable, purely presentational
  component. It receives `name`, `course`, `units`, and `isFullLoad`
  as props (destructured directly in the function signature) and
  renders them. It has no knowledge of the full roster — it only
  knows how to display one student. The "Full Load" label is shown
  conditionally with `{isFullLoad && <Text>Full Load</Text>}`.

- **`StudentRoster.js`** — the parent/container component. It owns
  the `students` data (as state, so the list can be reordered), and
  is responsible for turning that array into a list of `StudentCard`
  elements with `.map()` (via `FlatList`'s `renderItem`), each keyed
  by the student's stable `id`. It also computes and displays the
  total student count using a JSX expression built from a template
  literal: ``{`${roster.length} students enrolled`}``.

- **`App.js`** — the entry point that just renders `StudentRoster`
  inside a `SafeAreaView`.

This split matters because `StudentCard` stays dumb and reusable —
it doesn't care where its data comes from — while `StudentRoster` is
the only place that knows about the array, the mapping, and the key
prop.

## How to Run

```bash
npx create-expo-app StudentRoster
# then copy App.js, StudentCard.js, StudentRoster.js into the project
cd StudentRoster
npx expo start
```

Scan the QR code with Expo Go, or press `i` / `a` for a simulator.

## The Array-Index-as-Key Experiment

`StudentRoster.js` includes a comment block showing how to swap the
`id`-based key for an index-based one:

```js
keyExtractor={(item, index) => index.toString()}
```

After swapping in the index key and pressing "Reverse Order," the
list still _looks_ correct here because `StudentCard` is stateless —
its rendered text always matches whatever `item` React hands it for
that key. The real danger shows up once a card holds its own local
state (say, an expanded/collapsed toggle). With index keys, React
matches components to list _positions_, not to the _data_. So when
the array reorders, React thinks "the component at position 0 didn't
change" and keeps that component instance — including its local
state — in place, even though a different student's data is now
being rendered there. The state and the data become mismatched.

Keying by `student.id` fixes this: React tracks each component
instance by the student it represents, wherever that student ends up
in the array, so state and data always stay attached to the same
student.

## A Problem You're Likely to Hit

Forgetting the `key` prop entirely (or using a non-unique one)
triggers React's warning: `Warning: Each child in a list should have
a unique "key" prop.` It doesn't crash the app, but it's a sign React
can't reliably track which list item is which across re-renders,
which is exactly the bug demonstrated above. The fix is always the
same: use a value that's both unique and stable across renders — an
existing ID field, not the array index.

Another common one: forgetting to wrap `StudentRoster`'s return
value in a single root element (a `View` or a `<>...</>` Fragment)
causes a JSX parse error, since JSX only allows one top-level
element per return.
