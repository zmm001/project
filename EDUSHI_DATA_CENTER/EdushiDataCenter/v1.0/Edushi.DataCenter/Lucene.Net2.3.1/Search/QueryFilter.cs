�}[� r f  	���x��O��a	��4��_N��ꬩ=7����3N$�MX%�Q,d&��!�q�l��H���.,CP�������b�gۻzrp�y�x�V��io��c���R����N�I���4��C�<H�[~e��Q:mƜq���� �gNX��\xj�"'?Mg�A%1��I'A��q��`Џ��/`%!���s5ꬽ�\78�5�:������ ��|R����u]\ȉD�.�����o��?.�����_'Z���TK_?!Ǚ��p&�R��#�
��p�M�V��0�^R�0���L��:d%ߠJ{Ⱦv����-��K�ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�0�[{��o�GS�|� �{�����'������<�N�)�G�	�.�F��5UI��	O�yb��x����M�r��%yxV~3��G�䳽�8|0��(�s2�/m.�=���ǶL��[Ą���1�v�h��1l~�W�[m���xO5ר2	��* ��:U�YS+�������%.F[,'4��HO;|���!N~�>�W�Z���
����N+�q��+���
-$�F^�l��Y�U���$�3D"��zWw��(>B	?���w��x��NO��D����j���F3���C����J��{SrX���XScZ��٧�VA�n��y[5�b�mƘ��n���}W+�{�)�	n`oK���ps�6�;0vt�1���A���no��A/�!o�^�M��X_��GIR�	��%���`�q���~:ͥ�%��F�#�oԄ�k|ҭO�f�e�$$l�_x�Z�7ayC���b��j��U��]ie��2�c��yIl02&k�M(*jlEQ���?����U➇��2�D4,�q�i��1����c��bn��Jf��O+
)S�,�d��A��`J�GfV�v�7�Au�~��ESf,�'&�ҹ���n�
�S#s$�z�:`K��(ˊ�(��A0��q�: 5�5+U�-��Kr=)�J\a�P�YwL������A��Y��J�+�~y���UpN�u,�Sl>�ҟ�!�Y����بf$:q���8Kh��ќ�P��>/�豑e�w��m��s�xү|���	"^Bʅ��s�4��m�)��{k~�N��b�|�x, �����(ϫ ��Kh�k]�E��,\ g�6��ԙ_�4�P�g;���jzngC���ج06��뼸SV�,\s�3�d1�*��دy��Zl���߹����g��-O�.D����H�'�E�H� y�,4jv��3��>K!������cJ��c��F�ݠT�U�+59O"�A���?m����k�V�V����GI�;o��/ <code>query</code>.
		/// </summary>
		public QueryFilter(Query query):base(new QueryWrapperFilter(query))
		{
		}
		
		public  override bool Equals(System.Object o)
		{
			return base.Equals((QueryFilter) o);
		}
		
		public override int GetHashCode()
		{
			return base.GetHashCode() ^ unchecked((int) 0x923F64B9);
		}
	}
}