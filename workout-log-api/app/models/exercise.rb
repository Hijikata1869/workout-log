class Exercise < ApplicationRecord
  belongs_to :user

  before_validation :sanitize_name

  validates :name, presence: true, uniqueness: { scope: :user_id }, length: { maximum: 50 }

  scope :recent, -> { order(created_at: :desc, id: :desc) }

  def safe_attributes
    { id: id, name: name }
  end

  private

    def sanitize_name
      self.name = name&.squish
    end
end
