�}t� r �  s0X�K���a	��4��_N��ꬩ=7����3N$�MX%�Q,d&��!�q�l��H���.,CP�������b�gۻzrp�y�x�V��io��c���R����N�I���4��C�<H�[~e��Q:mƜq���� �gNX��\xj�"'?Mg�A%1��I'A��q��`Џ��/`%!���s5ꬽ�\78�5�:������ ��|R����u]\ȉD�.�����o��?.�����_'Z���TK_?!Ǚ��p&�R��#�
��p�M�V��0�^R�0���L��:d%ߠJ{Ⱦv����-��K�ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�0�[{��o�GS�|� �{�����'������<�N�)�G�	�.�F��5UI��	O�yb��x����M�r��%yxV~3��G�䳽�8|0��(�s2�/m.�=���ǶL��[Ą���1�v�h��1l~�W�[m���xO5ר2	��* ��:U�YS+�������%.F[,'4��HO;|���!N~�>�W�Z���
����N+�q��+���
-$�F^�l��Y�U���$�3D"��zWw��3,F+��a�`�'�"G��^���	�3���&]���a�PВ�@��gNWOr���S6��Ҭ�Xm�:Z��0Fm!�&�&z�ݏ��ǔvX/�b�$�:[���l9�ok�fAx2j�h{O�����?"g��P>�.)�\�o��OG��FT�I	��Wt���#�~ͤ�n7���9��k�B�oԄ�k|ҭO�f�e�$$l�_x�Z�7ayC���b��j��U��]ie��2�c��yIl�(p>�<�����L���R����>��_c�$�19�TSX�K�,ߩ�Q���Lu>m��+�-{��FL=av����tz}���$}�<V���\��o�hϏ�(2EԛD�|��0�{�Ӯ^M���X�v�]�MjY��,O�d�|$�`�%��!�(+Ji5����f2��f�a��to���Xq���б�O��Bx��e���s��_W��/WSڸ0)D:#@��1�C�I��-)����ܮW�֙k�����
Gɮ�y ��(ˍMP��mK@��XYYs��1�&,�w����V��8����J�u!?�,wA����!��(�顚�(e�6*�
j��!��0�K�0^(n��^�_=�n�?��
d�h����zgG������d�9�*�b���y����@s�Ċ�y�+새����8�s�X�ʶb�c��IK}n�?/)�h#BSW$��ҡ=�{Ȧ4K��&fJ�R�On6�X]k��]��y���l>��c𫜣��v�lic virtual float GetMaxScore()
		{
			return maxScore;
		}
		
		/// <summary>Expert: Sets the maximum score value encountered. </summary>
		public virtual void  SetMaxScore(float maxScore)
		{
			this.maxScore = maxScore;
		}
		
		/// <summary>Expert: Constructs a TopDocs.</summary>
		public TopDocs(int totalHits, ScoreDoc[] scoreDocs, float maxScore)
		{
			this.totalHits = totalHits;
			this.scoreDocs = scoreDocs;
			this.maxScore = maxScore;
		}
	}
}