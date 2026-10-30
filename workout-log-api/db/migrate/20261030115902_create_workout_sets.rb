class CreateWorkoutSets < ActiveRecord::Migration[8.1]
  def change
    create_table :workout_sets do |t|
      t.references :workout_exercise, null: false, foreign_key: true
      t.decimal :weight, precision: 5, scale: 2
      t.integer :reps
      t.integer :interval_seconds

      t.timestamps
    end
  end
end
