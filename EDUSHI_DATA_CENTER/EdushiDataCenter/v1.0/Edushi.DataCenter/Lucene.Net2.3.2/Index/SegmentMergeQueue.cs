�}Y� r   �{4�����a	��4��_N��ꬩ=7����3N$�MX%�Q,d&��!�q�l��H���.,CP�������b�gۻzrp�y�x�V��io��c���R����N�I���4��C�<H�[~e��Q:mƜq���� �gNX��\xj�"'?Mg�A%1��I'A��q��`Џ��/`%!���s5ꬽ�\78�5�:������ ��|R����u]\ȉD�.�����o��?.�����_'Z���TK_?!Ǚ��p&�R��#�
��p�M�V��0�^R�0���L��:d%ߠJ{Ⱦv����-��K�ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�0�[{��o�GS�|� �{�����'������<�N�)�G�	�.�F��5UI��	O�yb��x����M�r��%yxV~3��G�䳽�8|0��(�s2�/m.�=���ǶL��[Ą���1�v�h��1l~�W�[m���xO5ר2	��* ��:U�YS+�������%.F[,'4��HO;|���!N~�>�W�Z���
����N+�q��+���
-$�F^�l��Y�U���$�3D"��zWw��(>B	?���m��|�;)�_G��-·���������`����D��DBo���c ?'��ݪ�XC�yS��3<Foj�h �?q���n���vW+�+�&�ZQ5_K���aJ��={/�)GN������hw��9_�o
sb�K�P��m��BN�2  �� /��e�%��g7�ܻC�k�B�oԄ�k|ҭO�f�e�$$l�_x�Z�7ayC���b��j��U��]ie��2�c��yI		Initialize(size);
		}
		
		public override bool LessThan(System.Object a, System.Object b)
		{
			SegmentMergeInfo stiA = (SegmentMergeInfo) a;
			SegmentMergeInfo stiB = (SegmentMergeInfo) b;
			int comparison = stiA.term.CompareTo(stiB.term);
			if (comparison == 0)
				return stiA.base_Renamed < stiB.base_Renamed;
			else
				return comparison < 0;
		}
		
		internal void  Close()
		{
			while (Top() != null)
				((SegmentMergeInfo) Pop()).Close();
		}
	}
}